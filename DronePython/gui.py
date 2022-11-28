import tkinter as tk
from PIL import ImageTk, Image
import cv2
import socket  # UDP 통신을 위한 라이브러리
import threading
import numpy as np
import time
import os

print('\r\n\r\n파일 시작 됨.\r\n')

tello_address = ('192.168.10.1', 8889)  # 텔로 8889 포트


def videoRecorder():
    client_socket.sendto('streamon'.encode('utf-8'), tello_address)

    video = cv2.VideoCapture('udp://0.0.0.0:11111', cv2.CAP_FFMPEG)

    # create a VideoWrite object, recoring to ./video.avi
    if not video.isOpened():
        video.open('udp://0.0.0.0:11111')  # 만약에 꺼져있으면 새로 키고, 켜져있으면 그대로 놔둠.

    while True:
        ret, frame = video.read()  # capture의 내용 ret는 성공적으로 데이터를 받았는가?, frame은 데이터의 값(2차원 배열의 형태)
        if (ret):
            if frame is None or frame.size == 0:
                continue
            else:
                cv2.imshow('drone', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break


def recv():  # 데이터 받기
    state_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    state_socket.bind(("", 8890))

    while True:
        try:
            state_dict = {}
            data, server = state_socket.recvfrom(1024)

            data = data.decode(encoding="utf-8")

            if data == 'ok':
                continue

            for field in data.split(';'):

                state_data = field.split(":")
                if len(state_data) < 2:
                    continue
                key = state_data[0]
                value = state_data[1]

                state_dict[key] = value

            label1.config(
                text='pitch(전방기울기)={0} roll(측방기울기)={1}\nyaw(현재각도)={2} height(높이)={3} \ntempl(최저온도) = {4} temph(최고온도)={5}\nbattery(배터리)={6}'
                .format(state_dict['pitch'], state_dict['roll'], state_dict['yaw'], state_dict['h'],
                        state_dict['templ'], state_dict['temph'], state_dict['bat']))

        except Exception as e:
            print('\nExit . . . . \n')
            print(e)
            break


def on_off(b, img):
    global is_On, video_on

    if (is_On):
        client_socket.sendto('command'.encode('utf-8'), tello_address)
        b[0].config(image=img[0])
        state_receiver_thread = threading.Thread(target=recv, daemon=True)
        state_receiver_thread.start()
        is_On = False

    else:
        client_socket.sendto('End'.encode('utf-8'), tello_address)
        client_socket.close()
        b[0].config(image=img[1])
        is_On = True


def video_onoff():
    global video_on
    if (video_on):
        video_thread = threading.Thread(target=videoRecorder, daemon=True)
        video_thread.start()
        video_on = False
    else:
        video_on = True


def btnlist(img):
    count = 3
    photo()

    b = [None] * 15

    b[0] = tk.Button(button, image=img[1], relief='flat', command=lambda: on_off(b, img))  # command
    b[1] = tk.Button(button, image=img[2], relief='flat', command=lambda: video_onoff())  # streamon
    b[2] = tk.Button(button, image=img[3], relief='flat',
                     command=lambda: client_socket.sendto('takeoff'.encode('utf-8'), tello_address))  # takeoff
    b[3] = tk.Button(button, image=img[4], relief='flat',
                     command=lambda: client_socket.sendto('ccw 20'.encode('utf-8'), tello_address))  # turnbleft
    b[4] = tk.Button(button, image=img[5], relief='flat',
                     command=lambda: client_socket.sendto('forward 20'.encode('utf-8'), tello_address))  # forward
    b[5] = tk.Button(button, image=img[6], relief='flat',
                     command=lambda: client_socket.sendto('cw 20'.encode('utf-8'), tello_address))  # turnright
    b[6] = tk.Button(button, image=img[7], relief='flat',
                     command=lambda: client_socket.sendto('up 20'.encode('utf-8'), tello_address))  # up
    b[7] = tk.Button(button, image=img[8], relief='flat',
                     command=lambda: client_socket.sendto('left 20'.encode('utf-8'), tello_address))  # left
    b[8] = tk.Button(button, image=img[9], relief='flat',
                     command=lambda: client_socket.sendto('emergency'.encode('utf-8'), tello_address))  # emergency
    b[9] = tk.Button(button, image=img[10], relief='flat',
                     command=lambda: client_socket.sendto('right 20'.encode('utf-8'), tello_address))  # right
    b[10] = tk.Button(button, image=img[11], relief='flat',
                      command=lambda: client_socket.sendto('down 20'.encode('utf-8'), tello_address))  # down
    b[11] = tk.Button(button, image=img[12], relief='flat',
                      command=lambda: client_socket.sendto('flip l'.encode('utf-8'), tello_address))  # flipleft
    b[12] = tk.Button(button, image=img[13], relief='flat',
                      command=lambda: client_socket.sendto('back 20'.encode('utf-8'), tello_address))  # back
    b[13] = tk.Button(button, image=img[14], relief='flat',
                      command=lambda: client_socket.sendto('flip r'.encode('utf-8'), tello_address))  # flipright
    b[14] = tk.Button(button, image=img[15], relief='flat',
                      command=lambda: client_socket.sendto('land'.encode('utf-8'), tello_address))  # land

    b[0].grid(row=1, column=0, padx=5, pady=5)
    b[1].grid(row=1, column=2, padx=5, pady=5)
    b[2].grid(row=1, column=3, padx=5, pady=5)
    for i in range(3):
        for k in range(4):
            b[count].grid(row=i + 2, column=k, padx=5, pady=5)
            count += 1
    return b


def photo():
    name = ['on-off-on', 'on-off-off', 'streamon', 'takeoff', 'turnleft', 'foward', 'turnright', 'up', 'left',
            'emergency', 'right', 'down', 'flipleft', 'back', 'flipright', 'land']
    img = [None] * 16

    for i in range(len(name)):
        img[i] = tk.PhotoImage(file="img/" + str(name[i]) + '.png')
    return img


if __name__ == '__main__':
    is_On, video_on = True, True
    window = tk.Tk()
    window.title('드론제어 프로그램')
    window.resizable(width=False, height=False)

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    client_socket.bind(("", 9000))

    state = tk.Frame(window)
    button = tk.Frame(window, bg='white')

    state.pack(side='top', fill='x')
    button.pack(side='bottom', fill='x')

    label1 = tk.Label(state,
                      text='pitch(전방기울기)={} roll(측방기울기)={}\nyaw(현재각도)={} height(높이)={} \ntempl(최저온도) = {} temph(최고온도)={}\nbattery(배터리)={}',
                      bg='white', width=50, height=10)
    label2 = tk.Label(state, text="캠 종료 버튼: q", bg='white', width=50, height=5)
    label1.pack()
    label2.pack()

    # 버튼 섹션
    img = photo()
    bt = btnlist(img)

    window.mainloop()