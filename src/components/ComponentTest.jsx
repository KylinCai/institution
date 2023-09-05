const date = new Date()
function formatDate(date) {
    return new Intl.DateTimeFormat(
      'zh-CN',
      { weekday: 'long' }
    ).format(date);
  }

export default function TestComponent() {
    const star = '胡歌'
    const me = 'Kylin'
    const he = '刘杰'
    return (
        <>
            <ul>
                <li>第一行</li>
                <li>{star}</li>
                <li>{he}</li>
            </ul>
            <ul>
                <li>第二行</li>
                <li>{me+he}</li>
                <li>{formatDate(date)}</li>
            </ul>
        </>
    )
}