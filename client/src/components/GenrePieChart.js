import React from 'react';
import { Chart } from 'react-google-charts';

const GenrePieChart = (props) => {
  const categoryList = props.mappedBooks.map((book) => {
    return book.props.categories;
  });

  const categoryCount = {};
  categoryList.forEach((category) => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const data = Object.entries(categoryCount).map(([category, count]) => [category, count]);

  return (
    <div className='chart-wrapper'>
        <div>
        <div className='chart'>
            <Chart
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[['Category', 'Number of Category'], ...data]}
                rootProps={{ 'data-testid': '1' }}
                options={{
                    height: 500,
                    backgroundColor: '#DCBE87'
                }}
            />
        </div>
        </div>
    </div>
  );
};

export default GenrePieChart;
