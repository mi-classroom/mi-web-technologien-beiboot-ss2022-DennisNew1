## Live Demo
Available on https://www.gm.fh-koeln.de/~mi1933/ with a password. 

## Language
As this is part of a web technologies module in germany, some chapters may be in german language. However, most things will be in english as this is working language in computer science.

## Web Technologien // begleitendes Projekt Sommersemester 2022

Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Bearbeitung von Bildern. Hierbei steht weniger ein professioneller Konzeptions-, Entwurfs- und Entwicklungsprozess im Vordergrund, sondern vielmehr die sukzessive Weiterentwicklung einer Anwendung, das Ausprobieren, Vergleichen, Refactoren und die Freude an lauffähigem Code.



# Installation
## Prerequisites
You either need [node.js](https://nodejs.org/en/) or [docker](https://www.docker.com/) installed on your device. 

## Run localy
Using node.js:
```bash
npm install
npm run serve
```

or with docker:

```docker
docker build -t beiboot-dennisnew1:latest .
docker run -it -p 8080:8080 --rm --name beiboot-dennisnew1 beiboot-dennisnew1:latest
```

and to stop

```bash
docker stop beiboot-dennisnew1
```

# Build
```
npm run build
```