import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import {
  getCategories,
  isActive,
  getProductsByCategory,
  getProducts,
  swapCategoryTitle,
} from '../../redux/homeSlice';

import {
  Logo,
  Container,
  Header,
  NavLinks,
  Li,
  BurgerButton,
  BurgerInnerContainer,
  CloseButton,
  BurgerNavContainer,
  BackButton,
} from './styles/navbar';

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.homeReducer.categories);
  const isOpen = useSelector((state) => state.homeReducer.isActive);
  const isLoading = useSelector((state) => state.homeReducer.isLoading);

  useEffect(() => {
    if (categories.length === 0) dispatch(getCategories());
  }, [categories.length, dispatch]);

  const handleBurgerButtonClick = () => {
    dispatch(isActive());
  };

  const handleNavLinksClick = (category) => {
    dispatch(getProductsByCategory(category));
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    dispatch(swapCategoryTitle(categoryTitle));
    if (isOpen) {
      dispatch(isActive());
    }
  };

  const category = categories?.map((category) => (
    <Li key={category} onClick={() => handleNavLinksClick(category)}>
      {category}
    </Li>
  ));

  const getAllProducts = () => {
    dispatch(getProducts());
    dispatch(swapCategoryTitle('All Products'));
  };

  return (
    <>
      <Header isActive={isOpen} isLoading={isLoading}>
        <Container>
          <BurgerInnerContainer>
            <BackButton>Back</BackButton>
            <Logo onClick={getAllProducts}>
              <NavLink to="/">Shop</NavLink>
            </Logo>
            <BurgerButton onClick={handleBurgerButtonClick}>
              <GiHamburgerMenu />
            </BurgerButton>
          </BurgerInnerContainer>
          <BurgerNavContainer isActive={isOpen}>
            <CloseButton onClick={handleBurgerButtonClick}>
              <MdClose />
            </CloseButton>
            <NavLinks>{category}</NavLinks>
          </BurgerNavContainer>
        </Container>
      </Header>

      <Outlet />
    </>
  );
};

export default Navbar;
