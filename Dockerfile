
FROM python:3.6 
# 베이스 이미지로 파이썬 3.6을 사용

ENV PYTHONUNBUFFERED 1
# 파이썬 출력 버퍼링이 기본으로 작동함으로 버퍼링을 없애기 위해 환경변수 추가


COPY ./requirements.txt requirements.txt
RUN pip install -r requirements.txt
# 개발 환경 구성에 사용할 패키지들을 requirements.txt 에 정리한 후 컨테이너에 넣고 설치(pip install -r) 합니다

COPY . code

WORKDIR code
# 작업 디렉토리를 code로 설정합니다

EXPOSE 8000
# Docker 컨테이너 외부에 노출할 포트를 8000 으로 지정합니다


CMD ./manage.py migrate && \
    ./manage.py collectstatic --noinput && \
    newrelic-admin run-progunicorngram  --bind 0.0.0.0:$PORT --access-logfile - GamGam.wsgi:application
# Migrates the database, uploads staticfiles, and runs the production server
