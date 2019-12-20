FROM zenika/kotlin:1.3-jdk11
MAINTAINER Mustafa Caylak <mustafa.caylak@web.de>

WORKDIR /app
RUN apt update
RUN apt install zip
RUN curl -s https://get.sdkman.io | bash
RUN find ~/.sdkman -type d -exec chmod 755 {} +;
RUN find ~/.sdkman -type f -exec chmod 644 {} +;
RUN chmod +x ~/.sdkman/bin/sdkman-init.sh
RUN bash -c "source ~/.sdkman/bin/sdkman-init.sh && \
        sdk install gradle 6.0.1 "
COPY . /app
RUN bash -c "source ~/.sdkman/bin/sdkman-init.sh && \
        gradle --no-daemon build"
ENTRYPOINT ["java", "-jar", "./build/libs/rhino-api-0.0.1-SNAPSHOT.jar"]
