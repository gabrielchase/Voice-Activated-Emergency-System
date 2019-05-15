import numpy as np 
import pandas as pd
import speech_recognition as sr 
import matplotlib.pyplot as plt
import librosa as lr
import librosa.display

import math 
import statistics
import requests

from scipy.io.wavfile import read

# Road near MarSci: 14.651284, 121.069138
# Math: 14.648327, 121.071459

DATA= {
    "latitude": 14.648327,
    "longitude": 121.071459,
    "location_name": "Math Building"
}

def send_emergency_req(): 
    r = requests.post('http://34.239.117.132:3005/api/emergency/', json=DATA)
    print(r.status_code)
    print(r.json())

# from glob import glob

# FILE_NAME = 'multipletest.wav'

r = sr.Recognizer()
mic = sr.Microphone()
send_emergency = False

# audio_file = sr.AudioFile(FILE_NAME)
# glob_file = glob(FILE_NAME)
# print(glob_file)

with mic as source:
    print('Listening...')
    r.adjust_for_ambient_noise(source)
    audio = r.listen(source)
    # print('audio: ',  audio)
    # print(dir(audio))
    # print('raw_data: ', audio.get_raw_data())
    # print('data: ', audio.data)
    text = r.recognize_google(audio)
    

    wavbinary = audio.get_wav_data()
    # print('wavbinary: ', wavbinary)
    # samplerate = audio.sample_rate
    # print('samplerate: ', samplerate)
    f = open('/tmp/wav_output', 'wb')
    f.write(wavbinary)
    f.close()
    samprate, wavdata = read('/tmp/wav_output')

    # try:

    # chunks = np.array_split(wavdata, 20)
    # print('chunks: ', chunks)
    # dbs = []
    # for chunk in chunks: 
    #     print('chunk: ', chunk)
    #     print(statistics.mean(chunk**2))
    #     db = 20 * math.log10(math.sqrt(abs(statistics.mean(chunk**2))))
    #     print('db: ', db)
    #     dbs.append(db)

    # print('dbs: ', dbs)

    # dbs = [ for chunk in chunks]
    # print('dbs: ', dbs)


    y, sr = lr.load('/tmp/wav_output')
    # audio, sfreq = lr.load(glob_file[0])
    time = np.arange(0, len(y)) / sr

    print('time: ', time)

    for i in range (0, len(time), 1000):
        difference = 2*abs(y[i])
        if difference >=1 and 'help' in text: 
            print(time[i], ': ', y[i])
            send_emergency = True 
        print('{}: {} - {}'.format(i, time[i], difference))

    fig, ax = plt.subplots()
    ax.plot(time, y)
    ax.set(xlabel='Time (s)', ylabel='Sound Amplitude')

    # print('y: ', y)
    # print('sr: ', sr)
    # S = np.abs(lr.stft(y))
    # print('S: ', S)
    # dbs = lr.power_to_db(S**2)
    # print('dbs: ', dbs, len(dbs))
    # for idx, db in enumerate(dbs):
    #     # print('db: ', db)
    #     # print('len of db: ', len(db))
    #     _db = np.absolute(db)
    #     # print(statistics.mean(db))
    #     max_val = np.max(_db)
    #     print('{}: {}'.format(idx, max_val))
    # plt.figure()
    # plt.subplot(2, 1, 1)
    # librosa.display.specshow(S**2, sr=sr, y_axis='log')
    # plt.colorbar()
    # plt.title('Power spectrogram')
    # plt.subplot(2, 1, 2)
    # librosa.display.specshow(lr.power_to_db(S**2, ref=np.max),
    #                       sr=sr, y_axis='log', x_axis='time')
    # plt.colorbar(format='%+2.0f dB')
    # plt.title('Log-Power spectrogram')
    # plt.tight_layout()
    # time = np.arange(0, len(audio)) / sfreq


        # fig, ax = plt.subplots()
        # ax.plot(time, audio)
        # ax.set(xlabel='Time (s)', ylabel='Sound Amplitude')
    print('You said: ', text)
    print('send_emergency: ', send_emergency)
    if send_emergency:
        send_emergency_req()

    plt.show()
    # except:
    #     print('Audio not recognized')
