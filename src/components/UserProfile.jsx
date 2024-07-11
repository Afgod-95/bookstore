import React from 'react'
import { buttonsBgColor, HomeBgColor } from '../constants/Colors'
import { useMediaQuery } from 'react-responsive';

const UserProfile = () => {
const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <>
        {isMobile ? (
            <div style = {{display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '1.5rem', width: '90%', margin: 'auto'}}>
                <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
                    <div className="profile" style={styles.profile}>
                        <img src="https://t3.ftcdn.net/jpg/05/35/47/38/360_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg" alt="/profile image" style={styles.profileImage} />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '.5rem'}}>
                        <p style={{fontSize: '16px', color: '#fff'}}>Godwin Afari Boadu</p>
                        <p style ={{color: '#fff' }}>afgod98@gmail.com</p>
                    </div>
                </div>

                <div className="" style={styles.line}></div>
                <div className="help-us" style = {{display: 'flex', flexDirection: 'column', gap: '1rem',}}>
                    <h3 style={{fontSize: '1.6rem', textAlign: 'left'}}>Help Us Get Better</h3>
                    <p style={{lineHeight: '25px', fontFamily: 'serif', textAlign: 'left', color:'#fff'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dicta cupiditate quasi dignissimos similique necessitatibus repellat sit non ducimus mollitia nobis enim maiores vero exercitationem consectetur</p>
                    <div className="button" style={{alignSelf: 'center', width: '100%' }}>
                        <p style={{color: '#fff'}}>Vote</p>
                    </div>
                </div>

            </div>
            
        ): (
            <div style={{...styles.container}}>
                <div className="profile-container" style={{...styles.profileContainer, width: isMobile ? '100%' : '17vw'}}>
                    <div className="profile" style={styles.profile}>
                        <img src="https://t3.ftcdn.net/jpg/05/35/47/38/360_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg" alt="/profile image" style={styles.profileImage} />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '.5rem'}}>
                        <p style={{fontSize: '16px', color: '#fff'}}>Godwin Afari Boadu</p>
                        <p style={{color: '#fff' }}>afgod98@gmail.com</p>
                    </div>
                </div>
                <div className="" style={styles.line}></div>
                <div className="help-us" style={ styles.helpUs}>
                    <h3 style={{fontSize: '1.6rem', textAlign: 'left'}}>Help Us Get Better</h3>
                    <p style={{lineHeight: '25px', fontFamily: 'serif', color:'#fff'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dicta cupiditate quasi dignissimos similique necessitatibus repellat sit non ducimus mollitia nobis enim maiores vero exercitationem consectetur</p>
                    <div className="button">
                        <p style={{color: '#fff'}}>Vote</p>
                    </div>
                </div>
            </div>
        )}
        
    </>
    
  )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        position: 'relative',
        width: '80px',
        height: '80px'  
    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: '100px',
        objectFit: 'cover',
        objectPosition: 'center'
    },

    line: {
        width: '100%',
        height: '1px',
        backgroundColor: '#acadac',
        opacity: '0.2'
    }, 

    helpUs: {
        backgroundColor: HomeBgColor,
        marginTop: '15px',
        borderRadius: '20px',
        padding: '20px',
        width: '17vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
    }
}

export default UserProfile