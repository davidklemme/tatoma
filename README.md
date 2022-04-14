# tatoma
---
! unlicensed !
---


*React Native* based App (runs on Android and iOS) to fascilitate location based (*Google Maps API*) interest matching.
Users can meet through shared interest, base on location. Dedicated chat rooms are created for every interest group/location

No hosted backend necessary. Uses Heroku as key storage, so that no API key are saved unencrypted on the device or in revision control.

Runs on:

-- PubNub
-- Neo4J
-- Heroku (postgres) as relay server to exchange keys
-- Auth0
