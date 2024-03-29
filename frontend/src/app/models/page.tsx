import axios from "axios";
import View from "./view";

export default async function Page() {
  let model = [];
  try {
    // const response = await axios.get(
    //   "https://multimodalart-civitai-to-hf.hf.space/infos"
    // );
    const response = await axios.get(
      "https://huggingface.co/api/spaces?full=full&direction=-1&sort=likes&search=multimodal&limit=5"
    );

    model = response.data;
    console.log("dsfsadfsdaf", response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div>
      <View models={model} />
    </div>
  );
}
