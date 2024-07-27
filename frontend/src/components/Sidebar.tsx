import Image, { StaticImageData } from 'next/image'
import profile from '@asset/profile.png'
import yellow from '@asset/yellowdot.png'
import arrow from '@asset/arrow.png'
import circle from '@asset/circle.png'
import bell from '@asset/bell.png'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import house from '@asset/house.png'
import ana from '@asset/ana.png'
import setting from '@asset/setting.png'
import teams from '@asset/teams.png'
import board from '@asset/board.png'
import plus from '@asset/plus.png'
import downarrow from '@asset/downarrow.png'
import { useAppSelector } from '@/redux/hooks'

type Item = {
    src: StaticImageData; // Ensure this type matches what you're using
    text: string;
    timing: string;
};

const items: Item[] = [
    { src: board, text: 'Boards', timing: 'First' },
    { src: setting, text: 'Settings', timing: 'Second' },
    { src: teams, text: 'Teams', timing: 'Third' },
    { src: ana, text: 'Analytics', timing: 'Fourth' },
];

const Sidebar: React.FC = () => {

    const { currentUser } = useAppSelector((state) => state.user);



    const [isAnimating, setIsAnimating] = useState(false);

    const router = useRouter();

    const handleClick = () => {
        setIsAnimating(true);

        // Wait for the animation to complete before navigating
        setTimeout(() => {
            // router.push('/login');
        }, 300); // Duration of the animation
    };
    return (
        <div className="f-full h-full flex flex-col justify-between pt-[24px] pr-[16px] pb-[32px] pl-[16px] bg-[#FFFFFF]">
            <div className="flex flex-col gap-4 ">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row  items-center gap-2">
                        <Image
                            src={profile}
                            alt="profile"
                            width={31}
                            height={31}
                            className='rounded-[8px]'
                        />
                        <p className="font-medium text-[20px] leading-6 text-[#080808]">{currentUser.fullname}</p>
                    </div>
                    <div className='flex felx-row justify-between items-center'>
                        <div className='flex flex-row gap-5'>
                            <Image
                                src={bell}
                                alt="profile"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                            <Image
                                src={circle}
                                alt="profile"
                                width={24}
                                height={24}
                                className='h-6 w-6'

                            />
                            <Image
                                src={arrow}
                                alt="profile"
                                width={24}
                                height={24}
                                className='h-6 w-6'

                            />
                        </div>
                        <div
                            className={`h-10 w-[69px] bg-[#F4F4F4] rounded p-2 gap-[14px] ${isAnimating ? 'dissolve' : ''}`}
                            onClick={handleClick}
                        >
                            <p className='font-normal text-4 leading-[19.36px]'>Logout</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row bg-[#F4F4F4] border p-2 border-[#DDDDDD] rounded gap-[14px]'>
                            <Image
                                src={house}
                                alt="profile"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                            <p className='font-normal text-[#797979] text-5 leading-[24.2px] '>Home</p>
                        </div>
                        {items.map((item, index) => (
                            <div key={index} className='flex flex-row px-2 py-1 gap-[14px]'>
                                <Image
                                    src={item.src}
                                    alt={item.text}
                                    width={24}
                                    height={24}
                                    className='h-6 w-6'
                                />
                                <p className='font-normal text-[#797979] text-5 leading-[24.2px]'>
                                    {item.text}
                                </p>
                            </div>
                        ))}

                    </div>
                    <div className='flex flex-row gap-2 rounded-lg border p-2 justify-center items-center'
                        style={{
                           
                            background: 'linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)',
                        }}
                    >
                        <p className='font-medium text-[20px] leading-[24.2px] text-[#FFFFFF]'>Create new task</p>
                        <Image
                            src={plus}
                            alt="plus"
                            width={24}
                            height={24}
                            className='h-6 w-6'
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-2 rounded-lg p-2 bg-[#F3F3F3]'>
                <Image
                    src={downarrow}
                    alt="plus"
                    className='h-10 w-10'
                />
                <div className='flex flex-col gap-1'>
                    <p className='text-xl leading-[24.2px] font-medium text-[#666666] h-6'>Download the app</p>
                    <p className='text-[14px] leading-[16.94px] font-normal  text-[#666666] h-[17px]'>Get the full experience</p>
                </div>
            </div>
        </div>

    )
}

export default Sidebar