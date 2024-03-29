import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import Card from "@/components/atoms/card";
import { Button } from "antd";

export type MultimodalItemPropsType = {
  id: string;
  author: string;
  cardData: {
    title: string;
    emoji: string;
    colorFrom: string;
    colorTo: string;
    sdk: string;
    app_file: string;
    pinned: false;
  };
};

const MultimodalItem = ({ id, cardData, author }: MultimodalItemPropsType) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [subdomain, setSubdomain] = useState<string>("");

  const onClickItemHandle = () => {
    setOpenModal(true);
    console.log(id);
    const prepared = id.toLowerCase().replaceAll("_", "-");
    setSubdomain(prepared.split("/")[0] + "-" + prepared.split("/")[1]);
  };

  return (
    <>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        width={840}
        footer={null}
      >
        <iframe
          className="w-[800px] h-[480px] p-[20px]"
          src={`https://${subdomain}.hf.space`}
        />
        <div className="flex w-full justify-center gap-10">
          <Button className="p-4 text-xl h-fit items-center">Demo</Button>
          <Button className="p-4 text-xl h-fit items-center">Download</Button>
        </div>
      </Modal>
      <Card className="p-[20px] bg-gradient-radial cursor-pointer">
        <div onClick={() => onClickItemHandle()}>
          <p className="text-slate-900 text-2xl uppercase break-words w-[260px] h-[36px]">
            {author}
          </p>
          <p className="text-[#0e0e0e] text-[18px] break-words w-[260px] h-[36px]">
            {cardData?.title}
          </p>
          <div className="mt-[20px]">
            <p className="text-[50px] text-center">{cardData?.emoji}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MultimodalItem;
