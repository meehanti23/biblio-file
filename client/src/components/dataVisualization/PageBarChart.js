import React from 'react';
import { Chart } from 'react-google-charts';

const PageBarChart = (props) => {
  const filteredBooks = props.mappedBooks.filter((book) => {
    return book.props.pageCount !== 0 && book.props.pageCount !== null;
  });

  const sortedBooks = filteredBooks.sort((bookA, bookB) => {
    return bookA.props.pageCount - bookB.props.pageCount;
  });

  const titleList = sortedBooks.map((book) => {
    return book.props.title;
  });

  const pageCountList = sortedBooks.map((book) => {
    return book.props.pageCount;
  });

  const chartData = [['Book Title', 'Page Count']].concat(
    titleList.map((title, index) => [title, pageCountList[index]])
  );

  return (
    <div className='chart-wrapper'>
        <div>
            <div className='chart bar-chart'>
                <Chart
                chartType="BarChart"
                data={chartData}
                options={{
                    title: 'Book Page Count',
                    hAxis: {
                    title: 'Page Count',
                    },
                    vAxis: {
                    title: 'Book Title',
                    },
                    legend: 'none',
                    animation: {
                    startup: true,
                    easing: 'linear',
                    duration: 1500,
                    },
                    backgroundColor: '#DCBE87'
                }}
                width="100%"
                height="400px"
                legendToggle
                />
            </div>
        </div>
    </div>
  );
};

export default PageBarChart;
