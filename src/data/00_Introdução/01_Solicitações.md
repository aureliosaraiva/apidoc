### Solicitações

Qualquer ferramenta que implemente recurso HTTP pode se comunicar com a API simplesmente solicitando a URI correto. Os pedidos devem ser feitos utilizando o protocolo HTTPS para que o tráfego seja criptografado. A interface responde a diferentes métodos, dependendo da ação necessária.


| Método        | Uso           |
| ------------- | -------------|
| GET     		| Por simples recuperação de informações sobre a sua conta, gotas, ou ambiente, você deve usar o GET método. A informação que você pedir será devolvido a você como um objeto JSON. Os atributos definidos pelo objeto JSON pode ser usado para formar pedidos adicionais. Qualquer solicitação usando o método GET é somente leitura e não afetará nenhum dos objetos que você está consultando. |
| DELETE      	| Para destruir um recurso e removê-lo da sua conta e meio ambiente, o EXCLUIR deve ser utilizado método. Isto irá remover o objeto especificado se ele for encontrado. Se não for encontrado, a operação irá retornar uma resposta indicando que o objecto não foi encontrado. Este idempotency significa que você não tem para verificar a disponibilidade de um recurso antes de emitir um comando de exclusão, o estado final será o mesmo, independentemente de sua existência.      |
| POST 			| Para criar um novo objeto, o seu pedido deverá especificar o POST método.O pedido POST inclui todos os atributos necessários para criar um novo objecto. Quando você quiser criar um novo objeto, enviar um pedido POST para o terminal de destino.      |
| PUT 			| Para atualizar as informações sobre um recurso na sua conta, o PUT método está disponível. Como o método de exclusão, o método PUT é idempotente. Ele define o estado do alvo usando os valores fornecidos, independentemente de seus valores atuais. Pedidos usando o método PUT não precisa verificar os atributos atuais do objeto.      | 


