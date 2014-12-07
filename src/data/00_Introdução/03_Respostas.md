### Respostas

Quando um pedido é bem sucedida, uma resposta corpo irá tipicamente ser enviado de volta, sob a forma de um objeto JSON. Uma exceção a isso é quando um pedido DELETE é processado, o que irá resultar em uma bem-sucedida HTTP 204 de status e um corpo de resposta vazio.

Dentro deste objeto JSON, a raiz do recurso que foi o alvo do pedido será definido como a chave. Esta será a forma singular da palavra, se o pedido operado em um único objeto, e a forma plural da palavra, se a coleção foi processado.

Por exemplo, se você enviar uma solicitação GET para / v2 / gotículas / $ DROPLET_ID você receberá de volta um objeto com uma chave chamada " gota ". No entanto, se você enviar a solicitação GET para a coleção geral da / V2 / gotas , você receberá de volta um objeto com uma chave chamada " gotas ".

O valor destas teclas será geralmente um objeto JSON para um pedido de um único objecto e um conjunto de objectos para um pedido de uma colecção de objectos.