import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const requestAnimationFrame = window.requestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.oRequestAnimationFrame;

class Chart extends Component {
  render() {
    const color = this.props.chartColor;
    const gradientSize = this.props.gradientSize;

    const data = (canvas) => {
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, gradientSize);

      gradient.addColorStop(0.000, color);
      gradient.addColorStop(1.000, '#fff');

      const labels = [];
      for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        labels.push(hour);
      }

      // random values to fill chart randomly
      function randomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const randomData = [];
      for (let i = 0; i < 24; i++) {
        const hour = randomInterval(0, 100);
        randomData.push(hour);
      }
      // end of random values

      return {
        labels,
        datasets: [
          {
            label: 'Popularity',
            fill: true,
            lineTension: 0.2,
            backgroundColor: gradient,
            borderColor: color,
            borderCapStyle: 'butt',
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: color,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 4,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color,
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 10,
            data: randomData,
          },
        ],
      };
    };

    return (
      <Line
        ref={(c) => { this.chart = c; }}
        data={data}
        height={this.props.chartHeight}
        options={{
          layout: {
            padding: {
              top: 5,
              left: 5,
              right: 5,
              bottom: 10,
            },
          },
          animation: {
            duration: 1500,
            easing: 'easeInOutQuart',
          },
          legend: {
            display: false,
          },
          tooltips: {
            titleFontFamily: 'Dubai',
            bodyFontFamily: 'Dubai',
            backgroundColor: '#fff',
            titleFontColor: '#000',
            borderColor: '#eee',
            borderWidth: 1,
            caretSize: 5,
            cornerRadius: 2,
            xPadding: 10,
            yPadding: 10,
            displayColors: false,
            enabled: false,
            mode: 'index',
            intersect: true,
            custom: (tooltipModel) => {
              // Tooltip Element
              let tooltipEl = document.getElementById('chartjs-tooltip');

              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = '<table></table>';
                document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              function getBody(bodyItem) {
                return bodyItem.lines;
              }

              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map(getBody);

                let innerHtml = '<div>';

                titleLines.forEach((title) => {
                  innerHtml += `<div class="tooltip-title"><div>${title}</div></div>`;
                });
                innerHtml += '</div><div>';

                bodyLines.forEach((body, i) => {
                  const colors = tooltipModel.labelColors[i];
                  let style = `background:${colors.backgroundColor}`;
                  style += `; border-color:${colors.borderColor}`;
                  style += '; border-width: 2px';
                  const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
                  innerHtml += `<div class="tooltip-body"><div>${span}${body}</div></div>`;
                });
                innerHtml += '</div>';

                const tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
              }

              const setPosition = () => {
                const position = this.chart.chart_instance.canvas.getBoundingClientRect();
                // styles
                tooltipEl.classList.add('chart-tooltip');
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = 'fixed';
                tooltipEl.style.left = `${position.left + tooltipModel.caretX}px`;
                tooltipEl.style.top = `${position.top + tooltipModel.caretY}px`;
                tooltipEl.style.fontFamily = 'Dubai';
                tooltipEl.style.backgroundColor = '#fff';
              };

              requestAnimationFrame(setPosition);
            },
          },
          scales: {
            xAxes: [{
              display: false,
              gridLines: {
                display: false,
              },
            }],
            yAxes: [{
              display: false,
              ticks: {
                min: 0,
                max: 100,
              },
              gridLines: {
                display: false,
              },
            }],
          },
        }}
      />
    );
  }
}

Chart.propTypes = {
  gradientSize: PropTypes.number.isRequired,
  chartColor: PropTypes.string.isRequired,
  chartHeight: PropTypes.number.isRequired,
};

export default Chart;
