# Ecommerce-Seguro
1. HTTPS: ¿Por qué OpenSSL local da alerta de "sitio no seguro" en el navegador y qué entidad como Let's Encrypt soluciona esto en producción?

RESPUESTA: OpenSSL da la alerta de "sitio no seguro" porque el certificado criptográfico SSL/TLS que se creó es autofirmado. Y esto al hacer un certificado autofirmado no existe una firma digital de una tercera entidad como (CA) que es de confianza que valida la propiedad de la llave pública sobre el dominio. Y el navegador al no poder ver quien es el emisor del certificado, sabe que es un riesgo (tipos ataque de phising o suplantación de identidad) y por eso bloquea la navegación con una alerta preventiva para proteger al usuario. 

Y la solución de este riesgo es utilizando una autoridad de certificación reconocida y confiable, que en este caso la conocida es Let's Encrypt, una CA abierta, gratuita y automatizada. Y Let's Encrypt soluciona esto por el protocolo ACME que automatiza los procesos de solicitud, validacion criptográfica, emisión y renovación periódica de certificados x.509 sin la necesidad de una persona. También firma digitalmente el certificado del dominio del cliente con sus llaves intermedias. 

2. Almacenamiento: Explique las ventajas de guardar un JWT en SessionStorage vs las sesiones tradicionales basadas en Cookies en términos de escalabilidad (Stateless).

RESPUESTA: Las ventajas son, escalabilidad horizontal directa: El payload del token alberga toda la información necesaria sobre la identidad y roles del usuario firmada criptográficamente por la clave privada del backend, el servidor no almacena sesiones en memoria. Otra ventaja es ciclo de vida al cliente, se limita estrictamente a la pestaña del navegador si la pestaña se llega a cerrar el token desaparece al instante en memoria del cliente y así que no haya riesgos no deseado de sesiones. 

3. Integraciones: Describa el impacto en ciberseguridad si un carro de compras integrara servicios externos (Transbank/Shipit) operando exclusivamente bajo HTTP tradicional.

RESPUESTA: El impacto serían, interceptación de datos sensibles que quiere decir esto, que cualquier entidad o atacante podría leer toda la información que pasa por la web, por ejemplo; nombres, emails, numeros de telefonos y direciones de despacho de los clientes, esto sería un riesgo altisimo de privacidad y las credenciales de API, tokens de auteticacion internos o calves de integración compartidas que hay en la tienda y servicios de shipit o transbank. 

Manipulación de datos (Man-In-The-Middle MITM), manipulación de precios el atacante puede interceptar la petición POST enviada al checkout, cambiar el campo de valor total de la compra en el carro de compras y desvío de despachos, al enviar los datos de entrega hacia shipit un atacante podría alterar la direccion postal de destino.