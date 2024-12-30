import React from 'react'


interface IBirthDay {
    year: string;
    month: string;
    day: string;
}

interface BirthDayProps {

    BirthDate: IBirthDay;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BirthDay: React.FC<BirthDayProps> = ({BirthDate, handleChange}) => {
  
    const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());
    //padStart는 앞에 채울문자, 앞의 인수는 채울길이고 뒤에 인수는 채울문자, 해당 필드는 2자리로 문자 '0'으로 채워짐
    const months = Array.from({ length: 12}, (_, i) => (i + 1).toString().padStart(2, '0'));
    const days = Array.from({ length: 31}, (_, i) => (i + 1).toString().padStart(2, '0'));


    return (
    <div className="birthDayForm">
      <select className="birth_year" name="year"  value={BirthDate.year} onChange={handleChange}>
        <option value="" disabled>년</option>
        { years.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
        ))}
      </select>
      <select className="birth_month" name="month" value={BirthDate.month} onChange={handleChange}>
        <option value="" disabled>월</option>
        { months.map((month) => (
            <option key={month} value={month}>
                {month}
            </option>
        ))}
      </select>
      <select className="birth_day" name="month" value={BirthDate.day} onChange={handleChange}>
        <option value="" disabled>일</option>
        { days.map((day) => (
            <option key={day} value={day}>
                {day}
            </option>
        ))}
      </select>
    </div>
  )
}

export default BirthDay
