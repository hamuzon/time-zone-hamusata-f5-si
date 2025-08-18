let serverUtcTime = null;
let clientReceivedAt = null;

function fetchServerTime() {
  fetch('/api/time')
    .then(res => res.json())
    .then(data => {
      serverUtcTime = new Date(data.utc);
      clientReceivedAt = new Date();
      syncToFullSecond();
    })
    .catch(err => {
      console.error("サーバーから時間を取得できませんでした。", err);
    });
}

function updateZones() {
  if (!serverUtcTime || !clientReceivedAt) return;

  const now = new Date();
  const elapsed = now - clientReceivedAt;
  const currentUtc = new Date(serverUtcTime.getTime() + elapsed);

  document.querySelectorAll('.zone-card').forEach(card => {
    const tz = card.dataset.timezone;

    try {
      const formatterTime = new Intl.DateTimeFormat('ja-JP', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      });

      const formatterDate = new Intl.DateTimeFormat('ja-JP', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short'
      });

      const parts = formatterTime.formatToParts(currentUtc);
      const timeParts = parts.filter(p => p.type !== 'timeZoneName');
      const timeStr = timeParts.map(p => p.value).join('');
      const tzNamePart = parts.find(p => p.type === 'timeZoneName');
      const tzAbbr = tzNamePart ? tzNamePart.value : '';

      card.querySelector('.time').textContent = timeStr;
      card.querySelector('.date').textContent = formatterDate.format(currentUtc);
      card.querySelector('.zone-offset').textContent = tzAbbr;
    } catch (e) {
      card.querySelector('.time').textContent = '不明なタイムゾーン';
      card.querySelector('.date').textContent = '';
      card.querySelector('.zone-offset').textContent = '';
    }
  });
}

// 🔧 最初の1回だけ「0秒」で開始するための処理
function syncToFullSecond() {
  const now = new Date();
  const millisToNextSecond = 1000 - now.getMilliseconds();

  setTimeout(() => {
    updateZones(); // 0秒ちょうどで1回実行
    setInterval(updateZones, 1000); // その後は毎秒更新
  }, millisToNextSecond);
}

// 実行開始
fetchServerTime();
