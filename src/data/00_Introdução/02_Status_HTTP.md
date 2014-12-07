### Status HTTP

Junto com os métodos HTTP que a API responde a, mas também irá retornar status HTTP padrão, incluindo códigos de erro.

No caso de um problema, o estado irá conter o código de erro, enquanto que o corpo da resposta será geralmente contêm informações adicionais sobre o problema que foi encontrado.

Em geral, se o estado devolvido é na gama de 200, isso indica que o pedido foi cumprida com sucesso e que nenhum erro foi encontrado.

Códigos de retorno na faixa de 400 tipicamente indicam que houve um problema com o pedido que foi enviado. Entre outras coisas, isso pode significar que você não autenticou corretamente, que você está solicitando uma ação que você não tem autorização para, que o objeto que você está solicitando não existe, ou que o seu pedido é mal formado.

Se você receber um status na faixa de 500, isso geralmente indica um problema do lado do servidor. Isso significa que nós estamos tendo um problema do nosso lado e não pode satisfazer o seu pedido no momento.