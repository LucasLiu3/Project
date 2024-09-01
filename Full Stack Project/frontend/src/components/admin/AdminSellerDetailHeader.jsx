function AdminSellerDetailHeader({ image }) {
  return (
    <div className="w-5/12 flex justify-center items-center py-3">
      <div>
        <img
          className="w-full h-[230px] rounded-full"
          src={
            image
              ? image
              : "https://res.cloudinary.com/djtucvk60/image/upload/v1725066386/profile/kie4jlanxsjom7du7gkm.jpg"
          }
          alt=""
        />
      </div>
    </div>
  );
}

export default AdminSellerDetailHeader;
