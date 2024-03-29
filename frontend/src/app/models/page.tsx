import axios from "axios";
import View from "./view";
import { MultimodalItemPropsType } from "@/components/molecules/multimodal-item";

export default async function Page() {
  let models: MultimodalItemPropsType[] = [];
  try {
    const response = await axios.get(
      "https://huggingface.co/api/spaces?full=full&direction=-1&sort=likes&search=multimodal&limit=5"
    );

    models = response.data;
    console.log("Multimodal models:", models);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div>
      <View models={models} />
    </div>
  );
}
