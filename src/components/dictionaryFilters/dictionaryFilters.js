import './dictionaryFilters.css';
import {useState} from 'react';

function DictionaryFilters (props) {
  
  const [word, setWord] = useState('');
  const [priority, setPriority] = useState(false);
  const {updater} = props;

  const updatePriority = (e) => {
    
    if (e.target.value === 'Все слова') {
      setPriority(false);
      updater(word, false);
    } else {
      setPriority(true);
      updater(word, true);
    }
  }
  console.log('Рендер фильтров'); // Консольная отладка
  return (
    <div className='filter-panel'>
      <input className='filter-panel__search-input'
             placeholder='Поиск по слову'
             value={word}
             onInput={(e) => {setWord(e.target.value); updater(e.target.value, priority)}}/>
      <div className='filter-panel__filters-wrap'>
        <div>По дате создания</div>
        <div className='filter'>
          <div>Приоритет</div>
            <select onChange={updatePriority}>
              <option>Все слова</option>
              <option>Только приоритетные</option>
            </select>
        </div>
        <div>Категория</div>
      </div>
    </div>
  )
}

export default DictionaryFilters;