import plus from '@asset/plus.png'
import Image from 'next/image'
import ai from '@asset/menubar/ai.png'
import cal from '@asset/menubar/cal.png'
import filter from '@asset/menubar/filter.png'
import search from '@asset/menubar/search.png'
import share from '@asset/menubar/share.png'
import Dialog from './Dialog'
import { useState } from 'react'

const Menubar: React.FC = () => {

    const [showTaskAdd, setShowTaskAdd] = useState(false);

    const openDialog = () => setShowTaskAdd(true);
    const closeDialog = () => setShowTaskAdd(false);

    return (
        <div className="flex flex-row justify-between">
            <div className='flex flex-row p-2  justify-between items-center rounded-lg border w-[196px] h-10 border-[#E9E9E9] bg-[#FFFFFF]'>
                <p className='font-normal text-[16px] leading-[19.36px] text-[#797979]'>
                    Search
                </p>
                <Image
                    src={search}
                    alt="plus"
                    width={24}
                    height={24}
                    className='h-6 w-6'
                />
            </div>
            <div className=" flex flex-row gap-4">
                <div className='flex flex-row gap-4 items-center'>
                    <div className='flex flex-row gap-[14px] p-2 rounded h-10 '>
                        <p className='font-normal text-[16px] leading-[19.36px] text-[#797979]'>
                            Calender view
                        </p>
                        <Image
                            src={cal}
                            alt="plus"
                            width={24}
                            height={24}
                            className='h-6 w-6'
                        />
                    </div>
                    <div className='flex flex-row gap-[14px] p-2 rounded h-10 '>
                        <p className='font-normal text-[16px] leading-[19.36px] text-[#797979]'>
                            Automation
                        </p>
                        <Image
                            src={ai}
                            alt="plus"
                            width={24}
                            height={24}
                            className='h-6 w-6'
                        />
                    </div>
                    <div className='flex flex-row gap-[14px] p-2 rounded h-10 '>
                        <p className='font-normal text-[16px] leading-[19.36px] text-[#797979]'>
                            Filter
                        </p>
                        <Image
                            src={filter}
                            alt="plus"
                            width={24}
                            height={24}
                            className='h-6 w-6'
                        />
                    </div>
                    <div className='flex flex-row gap-[14px] p-2 rounded h-10 '>
                        <p className='font-normal text-[16px] leading-[19.36px] text-[#797979]'>
                            Share
                        </p>
                        <Image
                            src={share}
                            alt="plus"
                            width={24}
                            height={24}
                            className='h-6 w-6'
                        />
                    </div>


                </div>
                <button onClick={openDialog} >
                    <div className='flex flex-row gap-2 rounded-lg border p-2 justify-center items-center'
                        style={{

                            background: 'linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)',
                        }}
                    >
                        <p className='font-medium text-[20px] leading-[24.2px] text-[#FFFFFF]'>Create new</p>
                        <Image
                            src={plus}
                            alt="plus"
                            width={24}
                            height={24}
                            className='h-6 w-6'
                        />
                    </div>
                </button>
            </div>
            <Dialog isOpen={showTaskAdd} onClose={closeDialog}>
                          <></>
            </Dialog>
        </div>
    )
}

export default Menubar