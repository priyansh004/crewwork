import Image from "next/image";
import close from "@asset/taskadd/close.png";
import dead from "@asset/taskadd/dead.png";
import fav from "@asset/taskadd/fav.png";
import full from "@asset/taskadd/full.png";
import pen from "@asset/taskadd/pen.png";
import pri from "@asset/taskadd/pri.png";
import share from "@asset/taskadd/share.png";
import status from "@asset/taskadd/status.png";
import plus from "@asset/taskadd/add.png";
const AddtaskCard: React.FC = () => {
    return (
        <div className="w-[670px] mt-4 px-2 py-6 flex flex-col  h-full">
            <div className="flex flex-col h-full gap-8 ">
                <div className="flex flex-col gap-[27px] w-[622px]">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4">
                            <Image
                                src={close}
                                alt="plus"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                            <Image
                                src={full}
                                alt="plus"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-row items-center h-10 gap-[14px] p-2 rounded bg-[#F4F4F4]">
                                <p className=" font-normal text-[16px] leading-[19.36px]  text-[#797979]">Share</p>
                                <Image
                                    src={share}
                                    alt="plus"
                                    width={24}
                                    height={24}
                                    className='h-6 w-6'
                                />

                            </div>
                            <div className="flex flex-row items-center h-10 gap-[14px] p-2 rounded bg-[#F4F4F4]">
                                <p className=" font-normal text-[16px] leading-[19.36px]  text-[#797979]">Favourite</p>
                                <Image
                                    src={fav}
                                    alt="plus"
                                    width={24}
                                    height={24}
                                    className='h-6 w-6'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[38px]">
                        <div className="flex flex-col gap-8  ">
                            <p className="font-semibold leading-[57.6px] text-[48px] text-[#CCCCCC]">
                                Title
                            </p>
                            <div className="flex flex-row gap-[60px] ">
                                <div className="flex flex-col gap-8  ">
                                    <div className="flex flex-row gap-6 items-center">
                                        <Image
                                            src={status}
                                            alt="plus"
                                            width={24}
                                            height={24}
                                            className='h-6 w-6'
                                        />
                                        <p className=" text-[16px] font-normal leading-[19.36px] text-[#666666]">Status</p>
                                    </div>
                                    <div className="flex flex-row gap-6 items-center">
                                        <Image
                                            src={pri}
                                            alt="plus"
                                            width={24}
                                            height={24}
                                            className='h-6 w-6'
                                        />
                                        <p className=" text-[16px] font-normal leading-[19.36px] text-[#666666]">Priority</p>
                                    </div>
                                    <div className="flex flex-row gap-6 items-center">
                                        <Image
                                            src={dead}
                                            alt="plus"
                                            width={24}
                                            height={24}
                                            className='h-6 w-6'
                                        />
                                        <p className=" text-[16px] font-normal leading-[19.36px] text-[#666666]">Deadline</p>
                                    </div>
                                    <div className="flex flex-row gap-6 items-center">
                                        <Image
                                            src={pen}
                                            alt="plus"
                                            width={24}
                                            height={24}
                                            className='h-6 w-6'
                                        />
                                        <p className=" text-[16px] font-normal leading-[19.36px] text-[#666666]">Description</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8  ">

                                    <p className=" text-[16px] font-normal leading-[24px] text-[#C1BDBD]">Not selected</p>
                                    <p className=" text-[16px] font-normal leading-[24px] text-[#C1BDBD]">Not selected</p>
                                    <p className=" text-[16px] font-normal leading-[24px] text-[#C1BDBD]">Not selected</p>
                                    <p className=" text-[16px] font-normal leading-[24px] text-[#C1BDBD]">Not selected</p>

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[23px] items-center">
                            <Image
                                src={plus}
                                alt="plus"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                            <p className="font-normal text-black  leading-[19.36px] text-[16px] ">Add custom property</p>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] bg-[#DEDEDE] w-full ">

                </div>
                <p className="font-normal text-[16px] leading-[19.36px] text-[#C0BDBD]">
                    Start writing, or drag your own files here.
                </p>
            </div>
        </div>
    )
}
export default AddtaskCard;