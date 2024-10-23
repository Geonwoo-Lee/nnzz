

const SearchTip = () => {
    return <div className='flex flex-col gap-6 px-4'>
        <div className='text-caption1 font-medium text-text-2'>
            검색 <span className='text-primary-6'>TIP</span>
        </div>
        <div className='flex flex-col gap-3'>
            <div className='text-body-2 font-bold'>
                도로명 + 건물주소
            </div>
            <div className='text-caption1 text-text-3 font-regular'>
                예시: 냠냠대로 159
            </div>
        </div>
    </div>
}

export default SearchTip