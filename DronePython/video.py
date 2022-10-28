import socket # upd 통신을 위한 라이브러리
import cv2 # 이미지 처리를 위한 open cv 라이브러리

tello_port = 8889
tello_address = ('192.168.10.1', 8889)  #텔로 8889 포트
mypc_address = ("0.0.0.0", 8889)
socket = socket.socket (socket.AF_INET, socket.SOCK_DGRAM)
socket.bind(mypc_address)

print ("Start streaming")

capture = cv2.VideoCapture ('udp://0.0.0.0:11111', cv2.CAP_FFMPEG) #텔로 비디오 소스, reader 설정
if not capture.isOpened():
    capture.open('udp://0.0.0.0:11111') #만약에 꺼져있으면 새로 키고, 켜져있으면 그대로 놔둠.

while True:
    ret, frame =capture.read() #capture의 내용 ret는 성공적으로 데이터를 받았는가?, frame은 데이터의 값(2차원 배열의 형태)
    if(ret):
        cv2.imshow('frame', frame)
    if cv2.waitKey (1)&0xFF == ord ('q'): #영상 화면을 끄기위한 코드 영상화면에서 q를 반복문을 종료하고 꺼짐.
        break;
capture.release ()
cv2.destroyAllWindows ()
pass

#from sys import getsizeof

#size of frame is 2073744
#size of frame[i] is 128
#frame[0][0] = [162 163 152]
#size of frame[0][0] = 112
