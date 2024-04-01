import BreadCrumb from "@/components/Shared/BreadCrumb";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BreadCrumb pageTitle="SHOP" pathList={["products"]} />

      {children}
    </>
  );
};

export default layout;
