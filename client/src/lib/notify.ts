import { toast } from 'react-toastify'

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.TOP_RIGHT,
})

export default toast
