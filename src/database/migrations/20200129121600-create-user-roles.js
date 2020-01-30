module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_roles', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            role_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: { model: 'roles', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user_roles');
    }
};

