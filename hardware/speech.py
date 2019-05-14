import numpy as np 
import pandas as pd
import speech_recognition as sr 
import librosa as lr
import matplotlib.pyplot as plt

from glob import glob

# FILE_NAME = 'multipletest.wav'

r = sr.Recognizer()
mic = sr.Microphone()

# audio_file = sr.AudioFile(FILE_NAME)
# glob_file = glob(FILE_NAME)
# print(glob_file)

with mic as source:
    print('Listening...')
    r.adjust_for_ambient_noise(source)
    audio = r.listen(source)

    try:
        text = r.recognize_google(audio)
        print('You said: ', text)

        # audio, sfreq = lr.load(glob_file[0])
        # time = np.arange(0, len(audio)) / sfreq
        # print('audio: ', audio)
        # print('time: ', time)

        # fig, ax = plt.subplots()
        # ax.plot(time, audio)
        # ax.set(xlabel='Time (s)', ylabel='Sound Amplitude')
        # plt.show()
    except:
        print('Audio not recognized')
