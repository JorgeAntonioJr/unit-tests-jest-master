const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('Deve adicionar uma nova tarefa', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);

        expect(gerenciador.listarTarefas()).toContain(tarefa);
    });

    test('Deve lançar um erro ao adicionar uma tarefa com descrição inválida', () => {
        const tarefa = { id: 1, descricao: 'a', concluida: false };
        gerenciador.adicionarTarefa(tarefa);

        expect(gerenciador.listarTarefas()).toContain(tarefa);
    });

    test('Deve remover uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(1);

        expect(gerenciador.listarTarefas()).not.toContain(tarefa);
    });

    test('Deve buscar uma tarefa por ID', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);

        expect(gerenciador.buscarTarefaPorId(1)).toEqual(tarefa);
    });

    test('Deve atualizar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(1, { descricao: 'Comprar pão' });

        expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Comprar pão');
    });

    test('Deve apresentar erro ao tentar atualizar uma tarefa inexistente', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(2, { descricao: 'Comprar pão' });

        expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Comprar leite');
    });

    test('Deve marcar uma tarefa como concluída', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(1);

        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
    });

    test('Deve apresentar erro ao tentar marcar uma tarefa inexistente como concluída', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);

        expect(() => {
            gerenciador.marcarTarefaComoConcluida(2);
        }).toThrow('Tarefa não encontrada');
    });


    test('Deve listar tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.listarTarefasConcluidas()).toContain(tarefa1);
        expect(gerenciador.listarTarefasConcluidas()).not.toContain(tarefa2);
    });

    test('Deve listar tarefas pendentes', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.listarTarefasPendentes()).toContain(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).not.toContain(tarefa1);
    });

    test('Deve remover tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();

        expect(gerenciador.listarTarefas()).not.toContain(tarefa1);
        expect(gerenciador.listarTarefas()).toContain(tarefa2);
    });

    test('Deve buscar tarefas por descrição', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.buscarTarefaPorDescricao('leite')).toContain(tarefa1);
        expect(gerenciador.buscarTarefaPorDescricao('leite')).not.toContain(tarefa2);
    });

    test('Deve adicionar uma tag a uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(1, 'compras');

        expect(gerenciador.buscarTarefaPorId(1).tags).toContain('compras');
    });

    test('Deve apresentar erro ao tentar adicionar uma tag a uma tarefa inexistente', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa);

        expect(() => {
            gerenciador.adicionarTagATarefa(2, 'compras');
        }).toThrow('Tarefa não encontrada');
    });

    test('Deve remover uma tag de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false, tags: ['compras'] };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTagDaTarefa(1, 'compras');

        expect(gerenciador.buscarTarefaPorId(1).tags).not.toContain('compras');
    });
    test('Deve apresentar erro ao tentar remover uma tag de uma tarefa inexistente', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: false, tags: ['compras'] };
        gerenciador.adicionarTarefa(tarefa);

        expect(() => {
            gerenciador.removerTagDaTarefa(2, 'compras');
        }).toThrow('Tarefa não encontrada');
    });

    test('Deve contar tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('Deve buscar tarefas por data', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', data: '2021-09-15' };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', data: '2021-09-16' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.buscarTarefasPorData('2021-09-15')).toContain(tarefa1);
        expect(gerenciador.buscarTarefasPorData('2021-09-15')).not.toContain(tarefa2);
    });

    test('Deve listar tarefas por tag', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', tags: ['compras'] };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', tags: ['compras'] };
        const tarefa3 = { id: 3, descricao: 'Estudar JavaScript', tags: ['estudos'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);

        expect(gerenciador.listarTarefasPorTag('compras')).toContain(tarefa1);
        expect(gerenciador.listarTarefasPorTag('compras')).toContain(tarefa2);
        expect(gerenciador.listarTarefasPorTag('compras')).not.toContain(tarefa3);
    });

    test('Deve listar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', prioridade: 'alta' };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', prioridade: 'baixa' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.listarTarefasPorPrioridade('alta')).toContain(tarefa1);
        expect(gerenciador.listarTarefasPorPrioridade('alta')).not.toContain(tarefa2);
    });

    test('Deve atualizar a prioridade de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', prioridade: 'alta' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(1, 'baixa');

        expect(gerenciador.buscarTarefaPorId(1).prioridade).toBe('baixa');
    });

    test('Deve apresentar erro ao tentar atualizar a prioridade de uma tarefa inexistente', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', prioridade: 'alta' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(2, 'baixa');

        expect(gerenciador.buscarTarefaPorId(1).prioridade).toBe('alta');
    });

    test('Deve contar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', prioridade: 'alta' };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', prioridade: 'baixa' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);

        expect(gerenciador.contarTarefasPorPrioridade('alta')).toBe(1);
        expect(gerenciador.contarTarefasPorPrioridade('baixa')).toBe(1);
    });

    test('Deve marcar todas as tarefas como concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();

        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
        expect(gerenciador.buscarTarefaPorId(2).concluida).toBe(true);
    });

    test('Deve reabrir uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.reabrirTarefa(1);

        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(false);
    });
    test('Deve apresentar erro ao tentar reabrir uma tarefa inexistente', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', concluida: true };
        gerenciador.adicionarTarefa(tarefa);

        expect(() => {
            gerenciador.reabrirTarefa(2);
        }).toThrow('Tarefa não encontrada');
    });

    test('Deve ordenar tarefas por data', () => { 
        const tarefa1 = { id: 1, descricao: 'Comprar leite', data: '2021-09-15' };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', data: '2021-09-16' };
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa1);

        expect(gerenciador.ordenarTarefasPorData()).toEqual([tarefa1, tarefa2]);
    });

    test('Deve ordenar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', prioridade: 'alta' };
        const tarefa2 = { id: 2, descricao: 'Comprar pão', prioridade: 'baixa' };
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa1);

        expect(gerenciador.ordenarTarefasPorPrioridade()).toEqual([tarefa1, tarefa2]);
    });
    
});
