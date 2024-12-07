import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAddress, selectUserInfo } from "../../store/features/user";
import AddAddress from "./AddAddress";
import { setLoading } from "../../store/features/common";
import { deleteAddressAPI } from "../../api/userInfo";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const [addAddress, setAddAddress] = useState(false);
  const dispatch = useDispatch();

  const onDeleteAddress = useCallback((id)=>{
      dispatch(setLoading(true));
      deleteAddressAPI(id).then(res=>{
        dispatch(removeAddress(id));
      }).catch(err=>{

      }).finally(()=>{
        dispatch(setLoading(false));
      })
  },[dispatch]);
  return (
    <div>
      <h1 className="text-2xl">Profile</h1>
      {!addAddress && (
        <div>
          <div className="flex gap-2">
            <h2 className="text-xl pt-4">Thông tin liên lạc</h2>
            <button className="underline text-blue-900 mt-4">Sửa</button>
          </div>
          <div className="pt-4">
            <p className="text-gray-700 py-2 font-bold">Họ và tên : </p>
            <p>
              {userInfo?.fullName}
            </p>
            <p className="text-gray-700 py-2 font-bold">Số điện thoại : </p>
            <p>{userInfo?.phoneNumber ?? "None"}</p>
            <p className="text-gray-700 py-2 font-bold">Email</p>
            <p>{userInfo?.email}</p>
          </div>
          {/* Addresses */}
          <div className="pt-4">
            <div className="flex gap-12">
              <h3 className="text-lg font-bold">Danh sách địa chỉ : </h3>
              <button className="underline text-blue-900" onClick={()=> setAddAddress(true)}>Thêm mới</button>
            </div>

            <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8 pb-10 mb-8">
              {userInfo?.addressList?.map((address, index) => {
                console.log(addAddress?.addressId);
                return (
                  <div
                    key={index}
                    className="bg-gray-200 border rounded-lg p-4"
                  >
                    <p className="py-2 font-bold">{address?.fullName}</p>
                    <p className="pb-2">{address?.phoneNumber}</p>
                    <p className="pb-2">
                      {address?.addressInformation}
                    </p>
                    <p className="pb-2">
                      {address?.otherDetail}
                    </p>
                    <div className="flex gap-2">
                      <button className="underline text-blue-900">Sửa</button>
                      <button onClick={()=> onDeleteAddress(address?.addressId)} className="underline text-blue-900">
                        Xoá
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {addAddress && <AddAddress onCancel={()=> setAddAddress(false)}/>}
    </div>
  );
};

export default Profile;
