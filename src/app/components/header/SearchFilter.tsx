// SearchFilter.jsx
import React, { useRef, useEffect, useState } from 'react';

import { ImReply } from 'react-icons/im';
import { Dispatch, SetStateAction } from 'react';
import styles from './SearchFilter.module.css';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';

interface DateRangeType {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface SearchFilterProps {
  onSearchChange: Dispatch<SetStateAction<string>>;
  onStatusChange: Dispatch<SetStateAction<string>>;
  onDateRangeChange: Dispatch<SetStateAction<DateRangeType[]>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearchChange,
  onStatusChange,
  onDateRangeChange,
}) => {
  const [displayDateValue, setDisplayDateValue] = useState('All time');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const refCalendar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('click', hideOnOutsideClick, true);
    return () => {
      document.removeEventListener('click', hideOnOutsideClick, true);
    };
  }, []);

  const hideOnOutsideClick = (e: any) => {
    if (refCalendar.current && !refCalendar.current.contains(e.target)) {
      setOpenCalendar(false);
    }
  };

  const handleDateSelect = (range: any) => {
    setDateRange([range.selection]);
    onDateRangeChange([range.selection]);
    setDisplayDateValue(
      `${format(range.selection.startDate, 'dd/MM/yyyy')} to ${format(
        range.selection.endDate,
        'dd/MM/yyyy'
      )}`
    );
  };

  const handleResetAll = () => {
  
  onSearchChange('');
  const searchInput = document.getElementById('searchBar') as HTMLInputElement;
  if (searchInput) {
    searchInput.value = '';
  }

  onStatusChange('all');
  const statusDropdown = document.getElementById('statusDropdown') as HTMLSelectElement;
  if (statusDropdown) {
    statusDropdown.value = 'all';
  }

  onDateRangeChange([]);
  setDisplayDateValue('All time');
  setDateRange([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  if (refCalendar.current) {
    const dateInput = document.getElementById('dateInput') as HTMLInputElement;
    if (dateInput) {
      dateInput.value = 'All time';
    }
  }
  };

  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.leftColumn}>
        <input
          id='searchBar'
          type="text"
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
          placeholder="Search by title"
          className={styles.inputField}
        />

        <select
          id='statusDropdown'
          onChange={(e) => onStatusChange(e.target.value)}
          className={styles.selectField}
        >
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="pending">Pending</option>
        </select>

        <div className={styles.calendarWrap}>
          <input
            id='dateInput'
            value={displayDateValue}
            readOnly
            onClick={() => {
              setOpenCalendar(!openCalendar);
            }}
            className={styles.inputField} 
          />

          <div ref={refCalendar} className={styles.calendarElement}>
            {openCalendar && (
              <DateRange
                editableDateInputs={true}
                onChange={handleDateSelect}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                className={styles.calendarElement}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <button onClick={handleResetAll} className={styles.resetButton}>
          <ImReply size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
