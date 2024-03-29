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
  subdomain: string;
  likes: number;
};

const MultimodalItem = ({
  id,
  cardData,
  author,
  subdomain,
  likes,
}: MultimodalItemPropsType) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [status, setStatus] = useState("description");

  const onClickItemHandle = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        width={840}
        footer={null}
      >
        <div className="text-center text-4xl uppercase p-4 text-indigo-700">
          {author}
        </div>
        {status === "details" && (
          <iframe
            className="w-[800px] h-[480px] p-[20px]"
            src={`https://${subdomain}.hf.space`}
          />
        )}
        {status === "description" && (
          <div className="flex flex-col gap-4 py-4 px-16">
            <div className="text-2xl flex justify-center gap-4">
              {cardData?.title}
              <div>{cardData?.emoji}</div>
            </div>
            <div>
              <b className="uppercase">Model id</b> : {id}
            </div>
            <div>
              <b className="uppercase">sdk</b> : {cardData?.sdk}
            </div>
            <div>
              <b className="uppercase">subdomain</b> : {subdomain}
            </div>
            <div>
              <b className="uppercase">likes</b> : {likes}
            </div>
          </div>
        )}

        <div className="flex w-full justify-center gap-10">
          <Button
            className="p-4 text-xl h-fit items-center"
            onClick={() => setStatus("description")}
          >
            Summary
          </Button>
          <Button
            className="p-4 text-xl h-fit items-center"
            onClick={() => setStatus("demo")}
          >
            Demo
          </Button>
          <Button
            className="p-4 text-xl h-fit items-center"
            onClick={() => setStatus("details")}
          >
            View Details
          </Button>
          <Button
            className="p-4 text-xl h-fit items-center"
            onClick={() => setStatus("details")}
          >
            Download
          </Button>
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
