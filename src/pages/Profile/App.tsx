import { api } from "@/api/App";
import CustomAvatar from "@/my-components/Avatar/App";
import { useUser } from "@/provider/userProvider/App";
import { UserAddress } from "@/types/Product/Location";
import { useEffect, useState } from "react";
import { AddressTile } from "./components/AdressTile";
import { Button } from "@/components/ui/button";
import { AddressModal } from "./components/AddressModal";

export function Profile() {
  const { user } = useUser();
  const [location, setLocation] = useState<UserAddress[]>([]);
  const [addressModal, setAddressModal] = useState<boolean>(false);

  const fetchLocation = async () => {
    try {
      const response = await api.get("/location/user");
      if (response.status == 200) {
        const payload = response.data;
        const locationArr: UserAddress[] = [];
        console.log(response.data);
        payload.data.forEach((ele) => {
          const add: UserAddress = { ...ele };
          locationArr.push(add);
        });
        setLocation(locationArr);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  console.log(location);

  return (
    <>
      <div className="w-full h-full p-6 ">
        {/* Profile Section */}
        <div className="p-6 rounded-2xl">
          <h2 className="text-3xl font-semibold mb-4">Your Profile</h2>
          <div className="flex items-center space-x-6">
            <CustomAvatar url={user?.userName?.slice(0, 1) ?? "U"} />
            <div>
              <div className="text-lg font-medium">{user?.userName}</div>
              <div className="text-sm">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-8 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold">Your Addresses</h2>
            <Button onClick={() => setAddressModal(true)} className="px-4 py-2">
              Add a New Address
            </Button>
          </div>
          {location.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {location.map((ele, key) => (
                <AddressTile key={key} data={ele} fetchData={fetchLocation} />
              ))}
            </div>
          ) : (
            <div className="text-center mt-4">No addresses added yet.</div>
          )}
        </div>

        {/* Address Modal */}
        <AddressModal
          fetchLocation={fetchLocation}
          setAddressModalState={setAddressModal}
          addressModalState={addressModal}
        />
      </div>
    </>
  );
}
