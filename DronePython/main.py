#캡디 / 권재호, 성익현, 김혜원
import threading #메인 루프 외에 다른 루프를 동시에 돌려야함 / 이 경우 수신 루프
import socket #UDP 통신을 위한 라이브러리


print('\r\n\r\n파일 시작 됨.\r\n')

host = ''
port = 9000
locaddr = (host, port)
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

tello_address = ('192.168.10.1', 8889)  #텔로 8889 포트
server_address = ('127.0.0.1', 3001) #웹 백 포트
sock.bind(locaddr) #파이썬 소켓 9000포트

#나중에 웹 연결이 끝나면 메인 루프로 변경할 것.
#입력을 웹에서만 받을 것이기 때문에 리시브 쓰레드를 유지할 필요가 없음.

def recv():  # 데이터 받기
    count = 0
    while True:
        try:
            data, server = sock.recvfrom(2024);
            print(data.decode(encoding="utf-8"), server, 'this')
            #데이터를 받은 후 다시 내보냄
            sent2 = sock.sendto(data, server_address);
        except Exception:
            print('\nExit . . . . \n')
            break

# 리시브 쓰레드 생성=
recvThread = threading.Thread(target=recv)
recvThread.start()

while True: #데이터 보내기
    try:
        msg = input();
        print(msg);

        if not msg:
            break

        if 'End' in msg:
            print('...')
            sock.close()
            break

        # 데이터 송신
        msg = msg.encode(encoding="utf-8")
        sent1 = sock.sendto(msg, tello_address);

    except KeyboardInterrupt:
        print('\n . . .\n')
        sock.close()
        break



