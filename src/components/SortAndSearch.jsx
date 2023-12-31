import  { useState } from 'react';
import { Input, Button, Dropdown, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/header.css';
import { Toolbar, Typography } from '@mui/material';


const SortAndSearch = ({
  onSortAZ,
  onSortZA,
  onSortByDateAscending,
  onSortByDateDescending,
  onFuzzySearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onFuzzySearch(searchQuery);
  };

  const handleSortIconClick = () => {
    setShowSortOptions((prev) => !prev);
  };

  const handleSearchIconClick = () => {
    setShowSearchForm((prev) => !prev);
  };

  const handleThemeOptionClick = (theme) => {
    setIsDarkTheme(theme === 'dark');
    setShowSettingsMenu(false);
  };

  return (
    <header  className="header2">
      
<div color='transparent' >
  
        <Toolbar>
          <div className={`header ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div onClick={handleSearchIconClick} className='header-Search'>
        <Icon name='search' />
      </div>

      {showSearchForm && (
        <form onSubmit={handleSearchSubmit}>
          <Input
            icon='search'
            iconPosition='left'
            type='text'
            placeholder='Search by title'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button type='submit'>Search</Button>
        </form>
      )}

      <div onClick={handleSortIconClick} className={`sort-container ${showSortOptions ? 'active' : ''}`}>
        <Icon placeholder={`sort content ${showSortOptions ? 'up' : 'down'}`} />
        <Dropdown
          placeholder='Sort By'
          selection
          options={[
            { key: 'az', value: 'az', text: 'A-Z' },
            { key: 'za', value: 'za', text: 'Z-A' },
            { key: 'asc', value: 'asc', text: 'Date Ascending' },
            { key: 'desc', value: 'desc', text: 'Date Descending' },
          ]}
          onChange={(e, { value }) => {
            if (value === 'az') {
              onSortAZ();
            } else if (value === 'za') {
              onSortZA();
            } else if (value === 'asc') {
              onSortByDateAscending();
            } else if (value === 'desc') {
              onSortByDateDescending();
            }
          }}
        />
      </div>
      
      <div className="SearchButton" onClick={() => setShowSettingsMenu(!showSettingsMenu)}>
        <Icon placeholder={`settings ${showSettingsMenu ? 'active' : ''}`} />
        {showSettingsMenu && (
          <div className="settings-menu">
            <Typography variant="p">Choose Theme:</Typography>
            <Button onClick={() => handleThemeOptionClick('light')}>Light Theme</Button>
            <Button onClick={() => handleThemeOptionClick('dark')}>Dark Theme</Button>
          </div>
        )}
      </div>
    </div>
        </Toolbar>
      </div>
      </header>

  );
};

export default SortAndSearch;