docker build -t rentx .
rodar o docker run -p 3333:3333 rentx, para inicializar o container
docker compose up para criar conteiner com compose

usar npm run migration:create src/shared/infra/typeorm/migrations/"nome da migrations" para crias as migrations
abriar o servido do windows e parar o postgre para funcionar o docker

#Configurare e pesquisar como fazer  a conexao com datasource  para criar seed de usuario admin 

criar a migration de cars

#Cadastro de carro
	##Requesitos funcionais
    	Dever ser possivel cadastrar um novo carro
		Deve ser possivel listar todas as categorias

	##Regras do negocio
		
		Somente usuario administrador deve cadastrar o carro	
		Não deve ser possivel cadastrar um carro com uma placa ja existente
		nao deve ser possivel alterar a placa de um carro ja cadastrado
		O carro deve ser cadastrado com disponibilidade por padrao 
		
		
#Listagem de Carros
	##Requesito funcionais
		Deve ser possivel listar todos os carros disponiveis
		Deve ser possivel listar todos os carros pelo nome da categoria
		Deve ser possivel listar todos os carros pelo nome do carro
		Deve ser possivel listar todos os carros pelo nome da marca do carro

	##Regras de negocios
		O usuario nao precisa estar logado no sistema para listar carros disponiveis

#Cadastro de Especificação do carro

	##Requesito funcionais

		Deve ser possivel cadastrar uma especificação para um carro
		Deve ser possiel listar todas as especificações
		Deve ser possivel listar todos os carros

	##Regras de Negocios
	
    	Somente usuarios administradores podem realizar cadastros	
		Não deve ser possivel cadastrar uma especificação para um carro nao cadastrado
		Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro

#Cadastro de imagem do carro
	
    ##Requesito funcional
	
    	Deve ser possivel cadastrar a imagem do carro
		Deve ser possivel listar todos os carros

	##Requesito nao funcional
		
		Utilizar o multer para uplaod dos arquvos

	##Regra de negocios
	
    	Somente usuarios administradores podem realizar cadastros	
		O usuario deve cadastrar mais de uma imagem para o mesmo carro
		

#Aluguel/agendamento
	
	##Requisito funcional

		Deve ser possivel cadastrar um aluguel

	##Regra de negocio
		
		O aluguel deve ter duração minima de 24h
		Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
		Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro		