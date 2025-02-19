import { api } from "@/api/App";
import { useToast } from "@/hooks/use-toast";
import { UserAddress } from "@/types/Product/Location";
import { TrashIcon } from "lucide-react";

export function AddressTile({
  data,
  fetchData,
}: {
  data: UserAddress;
  fetchData: () => void;
}) {
  const { toast } = useToast();
  const deleteLocation = async () => {
    try {
      const res = await api.delete("/location", {
        data: { id: data._id },
      });
      if (res.status == 200) {
        fetchData();
        toast({
          title: "Success",
          description: "Successfully deleted location",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full min-h-[10vh] dark:bg-zinc-950 rounded-2xl border p-4 relative">
      <button
        className="absolute bottom-0 right-0 m-4 rounded-lg hover:bg-red-800 p-2"
        onClick={deleteLocation}
      >
        <TrashIcon />
      </button>
      <div className="flex flex-col gap-2 ">
        <h3 className="text-lg font-semibold">{data.address}</h3>
        <p className="text-sm">{data.state}</p>
        <p className="text-sm">{data.country}</p>
      </div>
    </div>
  );
}
