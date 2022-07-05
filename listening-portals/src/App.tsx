import React from 'react';

import './App.css';
import Image from 'react-image-webp';
import LoadingSpin from "react-loading-spin";
import { BrowserView, MobileView } from 'react-device-detect';

export interface ButtonProps {
  url: string;
  id: string;
}

const Button: React.FC<ButtonProps> = props => { 
  const [state, setState] = React.useState({
    loading: true,
    play: false,
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
      newState.video.current && newState.video.current.play()
    } else {
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
        <LoadingSpin size="41px"/>
      </div>
      <div className={`${state.play ? "playing" : ""} Button`} onClick={togglePlay}>
      </div>
    </div>
  )
}

function App() {

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
                <Button id="a1" url="https://listening-portals.baitcode.link/ukraine_mobile_1.mp3" />
                <h1 className='ButtonCaption'>KYIV</h1>
              </div>
              <div className='Stream2'>
                <Button id="a2" url="https://listening-portals.baitcode.link/ukraine_mobile_2.mp3" />
                <h1 className='ButtonCaption'>KHARKIV</h1>
              </div>
              <div className='Stream3'>
                <Button id="a3" url="https://listening-portals.baitcode.link/ukraine_mobile_3.mp3" />
                <h1 className='ButtonCaption'>ODESSA</h1>
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
              The work was created in collaboration with <a className="link" href="https://liamazzari.com/">Lia Mazzari</a> &#38; Ben Parry.
              Special thanks to Grant Smith and <a className="link" href="https://soundtent.org/">Soundcamp</a> for helping build the boxes and Ilia Batii (baitcode) for technical support.
              For help in installing boxes in Ukraine, special thanks to: Prokhorenko Rodion.
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
              Робота була створена у колаборації з <a className="link" href="https://liamazzari.com/">Лією Маццарі</a> та Беном Паррі.
              За допомогу у встановленні боксів в Україні окрема подяка: Прохоренко Родіону.
              Особлива подяка Grant Smith та <a className="link" href="https://soundtent.org/">Soundcamp</a> за допомогу у будівництві коробок. та Іллі
              Батію (baitcode) за технічну підтримку.
            </p>
          </div>
        </div>
      </div>

      <div className='Container'>
        Powered by <a className="link" href="https://locusonus.org/wiki/index.php?page=Home.en">Locus Sonos</a>
      </div>
    </div>
  );
}

export default App;
