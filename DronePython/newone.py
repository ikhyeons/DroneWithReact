#캡디 / 권재호, 성익현, 김혜원
import socket #UDP 통신을 위한 라이브러리
import threading
import numpy as np
import time, cv2
import av

print('\r\n\r\n파일 시작 됨.\r\n')

def videoRecorder():
    video = cv2.VideoCapture('udp://0.0.0.0:11111', cv2.CAP_FFMPEG)
    # create a VideoWrite object, recoring to ./video.avi
    if not video.isOpened():
        video.open('udp://0.0.0.0:11111')  # 만약에 꺼져있으면 새로 키고, 켜져있으면 그대로 놔둠.

    while True:
        ret, img = video.read()  # capture의 내용 ret는 성공적으로 데이터를 받았는가?, frame은 데이터의 값(2차원 배열의 형태)
        if (ret):
            cv2.imshow('drone', img)
        if cv2.waitKey(1) & 0xFF == ord('q'):  # 영상 화면을 끄기위한 코드 영상화면에서 q를 반복문을 종료하고 꺼짐.
            break
    video.release()



locaddr = ('', 9000)
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
tello_address = ('192.168.10.1', 8889)  #텔로 8889 포트
server_address = ('127.0.0.1', 3004) #웹 백 포트
sock.bind(locaddr) #파이썬 소켓 9000포트

#나중에 웹 연결이 끝나면 메인 루프로 변경할 것.
#입력을 웹에서만 받을 것이기 때문에 리시브 쓰레드를 유지할 필요가 없음.


# 리시브 쓰레드 생성=
stream = threading.Thread(target=videoRecorder , daemon=True)
stream.start()

while True: #데이터 보내기
    try:
        data, server = sock.recvfrom(65536);
        if(data.decode(encoding="utf-8")!='unknown command: unknown' and data.decode(encoding="utf-8")!='unknown command: ok' and data.decode(encoding="utf-8")!='error') :
            print(data.decode(encoding="utf-8"), server)
            # 데이터를 받은 후 다시 내보냄
            sock.sendto(data, tello_address);
            if(data.decode(encoding="utf-8")=='command'):
                str = 'streamon'.encode('utf-8');
                print('get command')
                sock.sendto(str, tello_address);
    except KeyboardInterrupt:
        print('\n . . .\n')
        sock.close()
        break