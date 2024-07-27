import clock from "@asset/task/clock.png";
import Image from "next/image";
const TaskCard: React.FC = () => {
    return (
        <div className="flex flex-col rounded-lg border border-[#DEDEDE] bg-[#F9F9F9] gap-4 px-[14px] py-[13px] ">
            <div className="flex flex-col gap-[13px] ">
                <div className="flex flex-col gap-1 ">
                    <p className="font-medium text-[16px] text-[#606060] leading-[19.36px] ">
                        Implement User Authentication
                    </p>
                    <p className="font-normal text-[14px] text-[#797979] leading-[16.94px] ">
                        Develop and integrate user authentication using email and password.
                    </p>
                </div>
                <div className="inline-flex items-center rounded-lg px-[6px] py-2 bg-[#FF6B6B] w-[55px] h-[27px]">
                    <p className="font-normal  self-center text-justify text-[12px] text-[#FFFFFF] leading-[14.52px]">
                    Urgent
                    </p>
                </div>

                <div className="flex flex-row gap-2 items-center ">
                    <Image
                        src={clock}
                        alt="plus"
                        width={24}
                        height={24}
                        className='h-6 w-6'
                    />
                    <p className="font-semibold text-[14px] leading-[16.94px] text-[#606060] ">
                        2024-08-15
                    </p>
                </div>

            </div>
            <p className="font-medium text-[14px] leading-[16.94px] text-[#797979]">
                1 hr ago
            </p>
        </div>

    )
}

export default TaskCard;