import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";
import { calculateChange } from "@/lib/utils";

export class AppwriteOrderService {
  async getAllOrder({
    page = 1,
    resultPerPage = 10,
  }: {
    page?: string | number;
    resultPerPage?: string | number;
  }) {
    try {
      const QueryArray = [];

      // pagination
      if (resultPerPage) {
        QueryArray.push(Query.limit(Number(resultPerPage)));

        const skip = (Number(page) - 1) * Number(resultPerPage);
        if (skip) {
          QueryArray.push(Query.offset(skip));
        }
      }

      // sorting
      QueryArray.push(Query.orderDesc("$createdAt"));

      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createOrder(data: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getOrderDetails(orderId: string) {
    try {
      const response = await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        orderId
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        orderId,
        {
          order_status: status,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder({ orderId }: { orderId: string }) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        orderId
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getOrderDetailsByYear(year?: string) {
    const QUERY_LIMIT = 5000;
    const QUERY_YEAR = year ? Number(year) : new Date().getFullYear();

    // =>>>>>> Utility function  start
    function generateQueryDate(year: number) {
      return new Date(year, 0).toISOString();
    }

    function calculateTotalSale(orders: any[]) {
      const responseData = orders.reduce((acc, order) => {
        acc += order.paymentInformation.product_price;

        return acc;
      }, 0);

      return responseData;
    }

    function getProductsSortedByPopularity(products: any[]) {
      const productFrequency: any = {};

      // Count frequency of each product
      products.forEach((product) => {
        const key = product.name;
        if (productFrequency[key]) {
          productFrequency[key].count++;
        } else {
          productFrequency[key] = { ...product, count: 1 };
        }
      });

      // Convert frequency object to an array
      const productArray: any[] = Object.values(productFrequency);

      // Sort the array by frequency count in descending order
      productArray.sort((a: any, b: any) => b.count - a.count);

      return productArray;
    }
    // =>>>>> Utility function  end

    try {
      // fetch data
      const currentYearResponse = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        [
          Query.between(
            "$createdAt",
            generateQueryDate(QUERY_YEAR),
            generateQueryDate(QUERY_YEAR + 1)
          ),
          Query.equal("order_status", "completed"),
          Query.limit(QUERY_LIMIT),
        ]
      );

      const previousYearResponse = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        [
          Query.between(
            "$createdAt",
            generateQueryDate(QUERY_YEAR - 1),
            generateQueryDate(QUERY_YEAR)
          ),
          Query.equal("order_status", "completed"),
          Query.limit(QUERY_LIMIT),
        ]
      );

      // => calculate order and sale percentage (current year and last year)
      const orderChange = calculateChange(
        previousYearResponse.total,
        currentYearResponse.total
      );
      const saleChange = calculateChange(
        calculateTotalSale(previousYearResponse.documents),
        calculateTotalSale(currentYearResponse.documents)
      );

      // initialOrderAndSaleData Schema
      const initialOrderAndSaleDataSchema = {
        order: {
          total_order: 0,
          chartData: [
            { month: "January", order: 0 },
            { month: "February", order: 0 },
            { month: "March", order: 0 },
            { month: "April", order: 0 },
            { month: "May", order: 0 },
            { month: "June", order: 0 },
            { month: "July", order: 0 },
            { month: "August", order: 0 },
            { month: "September", order: 0 },
            { month: "October", order: 0 },
            { month: "November", order: 0 },
            { month: "December", order: 0 },
          ],
          progress: {
            value: orderChange.percentageChange,
            increment: orderChange.changeType === "increment",
          },
        },
        sale: {
          total_sale: 0,
          chartData: [
            { month: "January", sale: 0 },
            { month: "February", sale: 0 },
            { month: "March", sale: 0 },
            { month: "April", sale: 0 },
            { month: "May", sale: 0 },
            { month: "June", sale: 0 },
            { month: "July", sale: 0 },
            { month: "August", sale: 0 },
            { month: "September", sale: 0 },
            { month: "October", sale: 0 },
            { month: "November", sale: 0 },
            { month: "December", sale: 0 },
          ],
          progress: {
            value: saleChange.percentageChange,
            increment: saleChange.changeType === "increment",
          },
        },
      };

      const orderAndSaleData = currentYearResponse.documents.reduce(
        (acc, order) => {
          const monthIndex = new Date(order.$createdAt).getMonth();

          // Update total_order
          if (acc.order.total_order === 0) {
            acc.order.total_order = currentYearResponse.total;
          }
          // Update order chartData
          acc.order.chartData[monthIndex].order++;

          // Update total_sale
          acc.sale.total_sale += order.paymentInformation.product_price;
          // Update sale chartData
          acc.sale.chartData[monthIndex].sale +=
            order.paymentInformation.total_price;

          return acc;
        },
        initialOrderAndSaleDataSchema
      );

      const flatOrderItems = currentYearResponse.documents
        .flatMap((order) => order.orderItems)
        .flat()
        .flatMap((orderItem) => ({
          name: orderItem.product.name,
          price: orderItem.product.price,
        }));

      return {
        ...orderAndSaleData,
        popularProducts: getProductsSortedByPopularity(flatOrderItems),
      };
    } catch (error) {
      throw error;
    }
  }
}

const appwriteOrderService = new AppwriteOrderService();

export default appwriteOrderService;
