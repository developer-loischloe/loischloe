import TopView from "./TopView";
import appwriteOrderService from "@/appwrite/appwriteOrderService";

const OverView = async ({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) => {
  const response = await appwriteOrderService.getDashboardOverviewData({
    fromDate,
    toDate,
  });

  return (
    <div className="space-y-5">
      <TopView response={response} />
    </div>
  );
};

export default OverView;
