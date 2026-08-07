(function () {
  "use strict";

  // Common colors to match the theme
  const colors = {
    brand: '#12b7a6',
    brandDark: '#0e9486',
    accent: '#2563eb',
    gold: '#f4b740',
    ink: '#1e293b',
    muted: '#64748b',
    border: '#e2e8f0'
  };

  const isDarkMode = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  const textColor = isDarkMode ? '#cbd5e1' : colors.ink;
  const gridColor = isDarkMode ? '#334155' : colors.border;

  // 1. Revenue Chart (Area, smooth gradient) - used in Dashboard
  const revenueEl = document.querySelector("#revenueChart");
  if (revenueEl && typeof ApexCharts !== 'undefined') {
    const revOptions = {
      series: [{
        name: 'Completed Revenue',
        data: (() => { const b = JSON.parse(localStorage.getItem('sparklepro_bookings')) || []; const base = [42, 55, 61, 58, 74, 81, 92, 105, 110, 102, 125, 140]; base[11] += parseFloat((b.length * 0.14).toFixed(1)); return base; })()
      }],
      chart: {
        type: 'area',
        height: 350,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        toolbar: { show: false },
        animations: { enabled: true, easing: 'easeinout', speed: 800 }
      },
      colors: [colors.brand],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [50, 100]
        }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: textColor } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: {
          style: { colors: textColor },
          formatter: (value) => { return "$" + value + "k" }
        }
      },
      grid: {
        borderColor: gridColor,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } }
      },
      tooltip: {
        theme: isDarkMode ? 'dark' : 'light',
        y: { formatter: function (val) { return "$" + val + "k" } }
      }
    };
    new ApexCharts(revenueEl, revOptions).render();
  }

  // 2. Bookings Chart (Bar) - used in Analytics
  const bookingsEl = document.querySelector("#bookingsChart");
  if (bookingsEl && typeof ApexCharts !== 'undefined') {
    const bookOptions = {
      series: [{
        name: 'Bookings',
        data: (() => { const b = JSON.parse(localStorage.getItem('sparklepro_bookings')) || []; const base = [62, 71, 68, 84, 91, 78, 24]; base[6] += b.length; return base; })()
      }],
      chart: {
        type: 'bar',
        height: 300,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        toolbar: { show: false },
        animations: { enabled: true, speed: 800 }
      },
      colors: [colors.accent],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '45%',
        }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: { style: { colors: textColor } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: { style: { colors: textColor } }
      },
      grid: {
        borderColor: gridColor,
        strokeDashArray: 4
      },
      tooltip: { theme: isDarkMode ? 'dark' : 'light' }
    };
    new ApexCharts(bookingsEl, bookOptions).render();
  }

  // 3. Acquisition Channels (Donut) - used in Analytics
  const acqEl = document.querySelector("#acquisitionChart");
  if (acqEl && typeof ApexCharts !== 'undefined') {
    const acqOptions = {
      series: (() => { const c = JSON.parse(localStorage.getItem('sparklepro_customers')) || []; const base = [46, 28, 16, 10]; base[3] += c.length; return base; })(),
      chart: {
        type: 'donut',
        height: 300,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        animations: { enabled: true, speed: 800 }
      },
      labels: ['Referrals', 'Organic Search', 'Paid Campaigns', 'Direct'],
      colors: [colors.brand, colors.accent, colors.gold, colors.border],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: { show: true },
              value: {
                show: true,
                style: { colors: textColor },
                formatter: function (val) { return val + "%" }
              }
            }
          }
        }
      },
      dataLabels: { enabled: false },
      stroke: { show: false },
      legend: { show: false },
      tooltip: { theme: isDarkMode ? 'dark' : 'light' }
    };
    new ApexCharts(acqEl, acqOptions).render();
  }

})();
