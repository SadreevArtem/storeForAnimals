import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart } from '../../../redux/slices/cartSlice/cartSlice'
import { clearFavorites } from '../../../redux/slices/favoritesSlice/favoritesSlice'
import { removeToken } from '../../../redux/slices/tokenSlice/tokenSlice'
import stylesMenu from './styles.module.scss'

export function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logOutFunc = () => {
    dispatch(removeToken())
    dispatch(clearCart())
    dispatch(clearFavorites())
    setAnchorEl(null)
    navigate('/signin')
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BiMenuAltRight className={stylesMenu.user} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/useraccount">
            Аккаунт
          </Link>
        </MenuItem>
        <MenuItem onClick={logOutFunc}>Выйти</MenuItem>
      </Menu>
    </div>
  )
}
