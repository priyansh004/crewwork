import plus from '@asset/plus2.png'
import Image from 'next/image'

const Balckaddcard:React.FC =()=>{

    return(
        <div className="flex flex-row  rounded-lg p-2 justify-between items-center "
                        style={{
                            background: 'linear-gradient(180deg, #3A3A3A 0%, #202020 100%)'
                        }}
                        >
                            <p className="font-normal text-[16px] leading-[19.36px] text-[#E3E1E1] ">Add new</p>
                            <Image
                                src={plus}
                                alt="plus"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />  
                        </div>
    );
}
export default Balckaddcard;