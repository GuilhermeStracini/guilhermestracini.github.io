import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FilterBar from '../../src/components/FilterBar';

describe('FilterBar Component', () => {
  let onFilterChange: vi.Mock;
  let onSortChange: vi.Mock;

  beforeEach(() => {
    onFilterChange = vi.fn();
    onSortChange = vi.fn();
  });

  it('should render filter icons correctly', () => {
    render(<FilterBar onFilterChange={onFilterChange} onSortChange={onSortChange} />);
    
    const filterIcons = screen.getAllByRole('img');
    expect(filterIcons).toHaveLength(4);

    const filterTitles = ['Templates', 'POC', 'Hello World', 'Miscellaneous'];
    filterIcons.forEach((icon, index) => {
      expect(icon).toHaveAttribute('title', filterTitles[index]);
    });
  });

  it('should trigger filter change on icon click', () => {
    render(<FilterBar onFilterChange={onFilterChange} onSortChange={onSortChange} />);
    
    const filterIcon = screen.getByTitle('Templates');
    fireEvent.click(filterIcon);

    expect(onFilterChange).toHaveBeenCalledWith('template');
    
    fireEvent.click(filterIcon); // Clicking again should reset filter
    expect(onFilterChange).toHaveBeenCalledWith('');
  });

  it('should trigger sort field change on sort icon click', () => {
    render(<FilterBar onFilterChange={onFilterChange} onSortChange={onSortChange} />);
    
    const nameSortIcon = screen.getByTitle('Sort by Name');
    fireEvent.click(nameSortIcon);
    
    expect(onSortChange).toHaveBeenCalledWith('name', 'asc');

    const stargazerSortIcon = screen.getByTitle('Sort by Stargazers');
    fireEvent.click(stargazerSortIcon);

    expect(onSortChange).toHaveBeenCalledWith('stargazers_count', 'asc');
  });

  it('should toggle sort order when clicking sort order icon', () => {
    render(<FilterBar onFilterChange={onFilterChange} onSortChange={onSortChange} />);
    
    const sortOrderIcon = screen.getByTitle('Toggle Sort Order (ASC)');
    fireEvent.click(sortOrderIcon);
    expect(onSortChange).toHaveBeenCalledWith('name', 'desc');
    
    fireEvent.click(sortOrderIcon);
    expect(onSortChange).toHaveBeenCalledWith('name', 'asc');
  });
});
