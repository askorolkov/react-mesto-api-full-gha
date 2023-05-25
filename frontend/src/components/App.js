import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { ProtectedRoute } from './ProtectedRoute.js';
import { auth } from '../utils/auth.js';
import { InfoToolTip } from './InfoToolTip';


function App() {
  const [currentUser, setCurrentUser] = useState({userName:'', userDescription: '', userAvatar: '', userId: ''});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const handleSignIn = ()=> {
    setLoggedIn(true);
  }

  const [selectedCard, setSelectedCard] = useState(null);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //управляем состоянием попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const openProfilePopup = ()=> {
  setIsEditProfilePopupOpen(true);
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const openPlacePopup = ()=> {
    setIsAddPlacePopupOpen(true);
  };

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const openAvatarPopup = ()=> {
    setIsEditAvatarPopupOpen(true);
  }

  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false)
  const openInfoPopup = ()=> {
    setIsInfoPopupOpen(true);
  }

  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const openConfirmationPopup = ()=> {
    setIsConfirmationPopupOpen(true);
  }

  const [deletedCardId, setDeletedCardId] = useState('');
  const handleDeletedCardId = (cardId)=> {
    setDeletedCardId(cardId)
  }

  //закрываем попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)

  const navigate = useNavigate();

  const tokenCheck = ()=> {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) {
      return
    }
    auth.checkToken(jwt)
    .then((res)=>{
      if(res) {
        handleSignIn();
        setUserEmail(res.data.email);
        navigate('/');
      }
    })
  }

  useEffect(()=>{
    tokenCheck()
  },[])

  useEffect(()=> {
    if(loggedIn) {
      api.getInitialCards()
      .then((res)=> {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })

      api.getUserInfo()
      .then((res)=>{
        setCurrentUser({
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar,
          userId: res._id,
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },[loggedIn]);


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.userId);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(card_id) {
    api.deleteCard(card_id)
    .then((res)=>{
      setCards(cards.filter(card => card._id !== card_id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })

  }

  //передаем функцию в пропсы Main для получения id карточки
  //задаем полученный id в стейт для использования в попапе подтверждения
  function handleDeleteClick(cardId) {
    setDeletedCardId(cardId);
    openConfirmationPopup();
  }

  function handleUpdateUser(info) {
    api.changeUserInfo(info)
    .then((res)=> {
      setCurrentUser({
        userName: res.name,
        userDescription: res.about,
        userAvatar: res.avatar,
        userId: res._id,
      });
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  };

  function handleUpdateAvatar(info) {
    api.changeAvatar(info)
    .then((res)=>{
      setCurrentUser({
        userName: res.name,
        userDescription: res.about,
        userAvatar: res.avatar,
        userId: res._id,
      });
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  };

  function handleAddPlace(name, link) {
    api.addNewCard(name, link)
    .then((res)=> {
      setCards([res,...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
    .then((res)=> {
      setIsRegisterSuccess(true);
      openInfoPopup();
      navigate('/signin');
    })
    .catch((err) => {
      setIsRegisterSuccess(false);
      openInfoPopup();
      console.log(err);
    })
  }

  function handleLogin(email, password) {
    auth.login(email,password)
    .then((res)=>{
      if(res.token) {
        localStorage.setItem('jwt', res.token);
        handleSignIn();
        navigate('/');
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
  <div className="page">
    <div className="page__container">
      <Header email={userEmail} onClick={handleSignOut}/>
      <Routes>
        <Route path='/signin' element={<Login onLogin={handleLogin}/>} />
        <Route path='/signup' element={<Register onRegister={handleRegister} />} />
        <Route path='/' element={<ProtectedRoute element={Main}
            onEditProfile={openProfilePopup}
            onAddPhoto={openPlacePopup}
            onEditAvatar={openAvatarPopup}
            cardList={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            loggedIn={loggedIn} />} />
      </Routes>
      <Footer />
      <InfoToolTip isOpen={isInfoPopupOpen}
                   onClose={closeAllPopups}
                   registrationState={isRegisterSuccess}
                   onSuccess={'Вы успешно зарегистрировались!'}
                   onFailure={'Что-то пошло не так! Попробуйте еще раз.'}/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}>
      </EditProfilePopup>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}
                       onUpdateAvatar={handleUpdateAvatar}>
      </EditAvatarPopup>
      <AddPlacePopup onClose={closeAllPopups}
                     isOpen={isAddPlacePopupOpen}
                     onAddPlace={handleAddPlace}>
      </AddPlacePopup>
      <ConfirmationPopup isOpen={isConfirmationPopupOpen}
                         onClose={closeAllPopups}
                         onConfirm={handleCardDelete}
                         card_id={deletedCardId}>
      </ConfirmationPopup>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  </div>
  </CurrentUserContext.Provider>

  );
}

export default App;
