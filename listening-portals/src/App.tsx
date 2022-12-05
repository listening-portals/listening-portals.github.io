import React from 'react';

import './App.css';
import Image from 'react-image-webp';
import LoadingSpin from "react-loading-spin";
import { BrowserView, MobileView } from 'react-device-detect';
import GalleryImage from './assets/gallery.png';
// import ReactGA from 'react-ga';
// ReactGA.initialize('UA-000000-01');
// ReactGA.pageview(window.location.pathname + window.location.search);


export interface ButtonProps {
  url: string;
  id: string;
  mixpanel: Mixpanel;
}

const Button: React.FC<ButtonProps> = props => { 
  const [state, setState] = React.useState({
    loading: true,
    play: false,
    url: null,
    video: React.createRef<HTMLVideoElement>()
  });

  React.useEffect(() => {
    
    const finishLoading = () => {
      setState({
        ...state,
        loading: false,
      });
    }

    state.video.current && 
      state.video.current.addEventListener('canplay', finishLoading)


    return function cleanup() {
      state.video.current && 
        state.video.current.removeEventListener('canplay', finishLoading);
    };

  });

  const togglePlay = () => {
    const newState = {
      ...state,
      play: !state.play
    }

    if (newState.video.current) { 
      newState.video.current.volume = 1
    }

    if (newState.play) {
      props.mixpanel.track(`Stream ${props.id} started`)
      newState.video.current && newState.video.current.play()
    } else {
      props.mixpanel.track(`Stream ${props.id} stopped`)
      newState.video.current && newState.video.current.pause()
    }
    setState(newState);
  }

  return (
    <div className={`${state.loading ? "loading" : ""} ButtonWrapper`}>      
      <MobileView>
        <audio hidden={true} controls={true} preload="auto" autoPlay={true} muted={false} ref={state.video}>
          <source src={props.url} type="audio/mpeg"/>
        </audio>
      </MobileView>

      <BrowserView>
        <audio hidden={true} controls={true} preload="auto" autoPlay={false} muted={false} ref={state.video}>
          <source src={props.url} type="audio/mpeg"/>
        </audio>
      </BrowserView>
      
      <div className='Loader'>
        <LoadingSpin size="36px"/>
      </div>
      <div className={`${state.play ? "playing" : ""} Button`} onClick={togglePlay}>
      </div>
    </div>
  )
}


export interface AppProps {
  mixpanel: Mixpanel;
}

const App: React.FC<AppProps> = props => { 
  const mixpanel = props.mixpanel

  return (
    <div className="App">
      <div className='Background'></div>
      
      <div className='Container'>
        
        <div className='Header'>
          <h1>Listening portals</h1>
        </div>

      </div>
        
      <div className='Separator1'></div>
        
      <div className='Container'>
        <div className='Description'>
          <h1>Звукові портали</h1>

          <div className='Streams'>
            <div className='BoxPic'>
              <Image src={require("./assets/box.png")} webp={require("./assets/box.webp")}></Image>
            </div>

            <div className='Buttons'>
              <div className='Stream1'>
                <Button id="kyiv" url="https://listening-portals.baitcode.link/ukraine_mobile_3.mp3" mixpanel={mixpanel} />
                <h1 className='ButtonCaption'>KYIV</h1>
              </div>
              <div className='Stream2'>
                <Button id="kharkiv" url="https://listening-portals.baitcode.link/ukraine_mobile_2.mp3" mixpanel={mixpanel} />
                <h1 className='ButtonCaption'>KHARKIV</h1>
              </div>
              <div className='Stream3'>
                <Button id="odesa" url="https://listening-portals.baitcode.link/ukraine_mobile_1.mp3" mixpanel={mixpanel} />
                <h1 className='ButtonCaption'>ODESA</h1>
              </div>
            </div>
          </div>

          <div className='English'>
            <p>
              The work creates sound portals with the help of specially built sound boxes that were sent to three Ukrainian cities: Kyiv, Kharkiv, Odesa, Every day for 24 hours, with the help of a special mini computer and microphones located in each of the boxes, the sound of the cities will be streamed here.
            </p>
            <p>
              “Listening portals” is an open and mobile project. It is possible for new boxes to appear in new cities and periodically to move across the territory of Ukraine. 
            </p>
            <p>
              Project by <a className="link" href="https://www.timothymaxymenko.com/">Timothy Maxymenko</a> in collaboration with <a className="link" href="https://liamazzari.com/">Lia Mazzari</a> & Ben Parry. 
              The project was realized with support of <a className="link" href="https://pgs.pl/">Sopot National Art Gallery</a>.
              Special thanks to <a className="link" href="https://soundtent.org/">Grant Smith and Soundcamp</a> for helping build the boxes. Ilia Batii (baitcode) for IT and technical support. 
              For help in installing boxes in Ukraine, special thanks to: Prokhorenko Rodion & Oleksii Chystotin.
            </p>
          </div>
        
        </div>
      </div>
        
      <div className='Separator2'></div>
          
      <div className='Container'>
        <div className='Description'>
          <div className='Ukrainian'>
            <p>
              Робота являє собою свого роду звукові портали за допомогою спеціально побудованих звукових коробок, які були відправлені до трьох українських міст: Києву, Харкова та Одеси звідки кожного дня протягом 24-х годин за допомогою спеціального міні-комп'ютера та мікрофонів розташованих у кожній із коробок йтиме звуковий лайв стрім. 
            </p>
            <p>
              “Звукові портали” є відкритим та рухомим проектом, з часом можлива поява нових коробок у нових містах та періодичне їхнє переміщення по території України. 
            </p>
            <p>
              Автор проєкту: <a className="link" href="https://www.timothymaxymenko.com/">Тимофій Максименко</a> у колаборації з <a className="link" href="https://liamazzari.com/">Лією Маццарі</a> та Беном Паррі.
              Проект був реалізований за підтримки <a className="link" href="https://pgs.pl/">Національної галереї в Сопоті</a>.
              Особлива подяка <a className="link" href="https://soundtent.org/">Grant Smith та Soundcamp</a> за допомогу у будівництві коробок. Іллі Батію (baitcode) за IT та технічну підтримку. 
              За допомогу у встановленні боксів в Україні окрема подяка: Прохоренко Родіону та Олексію Чистоніну. 
            </p>
          </div>
        </div>
      </div>
      <div className='Container'>
        Powered by <a className="link" href="https://locusonus.org/wiki/index.php?page=Home.en">Locus Sonus</a>
      </div>
      <div className='Container'>
        <img id="gallery" src={GalleryImage} />
      </div>
    </div>
  );
}

export default App;
