import { Alert, Space } from 'antd'
import '../AlertErrors/AlertErrors.css'
const AlertErrors = ({ error }) => {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert message={error} description="This is an error message about copywriting." type="error" showIcon />
    </Space>
  )
}

export default AlertErrors
