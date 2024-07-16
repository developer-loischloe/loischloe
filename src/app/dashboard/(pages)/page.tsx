import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardStats from "@/components/dashboard/overView/DashboardStats";
import RecentComment from "@/components/dashboard/overView/RecentComment";
import SelectYear from "@/components/dashboard/overView/SelectYear";

const OverView = async ({
  searchParams: { year },
}: {
  searchParams: {
    year: string;
  };
}) => {
  return (
    <div>
      <SelectYear />
      <br />
      <div className="space-y-5">
        <DashboardStats year={year} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          <RecentComment />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Card Title</CardTitle>
            </CardHeader>
            <CardContent>Card</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverView;
